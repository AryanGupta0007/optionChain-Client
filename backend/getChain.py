import flask
import pandas as pd
import traceback
import requests
import logging
import time
import re
import sys
import random
from datetime import datetime
from tvDatafeed import TvDatafeed, Interval

def get_symbol_ltp(symbol):
    username = None
    password = None
    tv = TvDatafeed(username, password)

    symbol = "NIFTY"
    exchange = "NSE"

    data = tv.get_hist(
        symbol=symbol,
        exchange=exchange,
        interval=Interval.in_1_minute,  # Use 1-minute interval for near real-time data
        n_bars=1                       # Fetch only the latest bar
    )

    # Extract the latest price
    if not data.empty:
        latest_price = data['close'].iloc[-1]
        print(f"The current Nifty 50 market price is: {latest_price}")
    else:
        print("No data found. Please check the symbol or exchange.")
    return latest_price
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

def getNuvamaSessionAndAppid() -> tuple:

    for ii in range(1, 6):

        try:

            session = requests.Session()
            response = session.get("https://www.nuvamawealth.com")

            appidkey = response.text
            appidkey = re.findall(r"\'ey.*\w\'", appidkey)[0].replace("'", "")
            return session, appidkey

        except Exception:
            logging.error(traceback.format_exc())
            time.sleep(ii)

def fetchOptionChain(reqSession: requests.Session, isIndex: bool, symbol: str, expirydate: str, reqHeaders: dict) -> dict:

    for ii in range(1, 6):

        try:

            option_type = "OPTIDX" if isIndex else "OPTSTK"
            ocUrl = "/edelmw-content/content/options/optionchaindetails" + f"/{option_type}" + f"/{symbol.upper()}/" + expirydate
            ocUrl = "https://nw.nuvamawealth.com" + ocUrl

            return reqSession.get(url=ocUrl, headers=reqHeaders).json()

        except Exception:
            logging.error(traceback.format_exc())
            time.sleep(ii)

    return {}

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/getChain', methods=["GET", "POST"])
def sendChain():
    if request.method == "POST":
        data = request.json  # Parse the JSON data from the POST request
        index = data.get("index")
        noOfRows = int(data.get("rows", 0))  # Default to 0 if not provided
        expiry = data.get("expiry")
        original_format = "%d-%m-%Y"
        print(expiry, index)
        # Parse the string into a datetime object
        datetime_obj = datetime.strptime(expiry, original_format)

        # Convert to the desired format
        new_format = "%Y-%m-%d"  # Change to your desired format
        formatted_datetime = datetime_obj.strftime(new_format)
        logging.info("System started")

        OC_REQ_HEADERS = {
            "authority": "nw.nuvamawealth.com", "origin": "https://www.nuvamawealth.com", "referer": "https://www.nuvamawealth.com/", "source": "EDEL",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
            "content-type": "application/json"
        }

        sessionResp = getNuvamaSessionAndAppid()
        if sessionResp is None:
            logging.error("Cann't fetch option chain. Hence, stopping.")
            exit()

        NUVAMA_REQ_OBJ = sessionResp[0]
        OC_REQ_HEADERS.update({"appidkey": sessionResp[1]})
#         print("hello", expiry, index, noOfRows)
        ocresp = fetchOptionChain(reqSession=NUVAMA_REQ_OBJ, isIndex=True, symbol=index, expirydate=formatted_datetime, reqHeaders=OC_REQ_HEADERS)
        print("oscrep ", ocresp)
        if ocresp:
            ocresp = ocresp['data']['opChn']
            print(ocresp)
#             sys.exit()
            cedata = [{"strike": ii['stkPrc'], 'ltp': ii['ceQt']['ltp'], 'oiChng': ii['ceQt']['opIntChg'], 'oi': ii['ceQt']['opInt'], 'vol': ii['ceQt']['vol'],
                      'IV': ii['ceQt']['ltpivfut'], 'chg': ii['ceQt']['chg'], 'bidQty': ii['ceQt']['bdSz'], 'bid': ii['ceQt']['bidPr'], 'ask': ii['ceQt']['askPr'], 'askQty': ii['ceQt']['askPr'],
                       'askOty' : ii['ceQt']['akSz'], 'ATM': ii['ATM']} for ii in ocresp]
            pedata = [{"strike": ii['stkPrc'], 'ltp': ii['peQt']['ltp'], 'oiChng': ii['peQt']['opIntChg'], 'oi': ii['peQt']['opInt'], 'vol': ii['peQt']['vol'],
                      'IV': ii['peQt']['ltpivfut'], 'chg': ii['peQt']['chg'], 'bidQty': ii['peQt']['bdSz'], 'bid': ii['peQt']['bidPr'], 'ask': ii['peQt']['askPr'], 'askQty': ii['peQt']['askPr'],
                       'askOty': ii['peQt']['akSz'], 'ATM': ii['ATM']} for ii in ocresp]

            rows = []

            for x in range(len(cedata)):
                if (cedata[x]['ATM'] == True):
                    trueValue = x
                dict = {"sno": x, "strike": cedata[x]['strike'], "calls": cedata[x], "puts": pedata[x], "synthetic": round(float(cedata[x]["ltp"]) + float(cedata[x]['strike']) - float(pedata[x]["ltp"]), 2)}
                rows.append(dict)
            if index == "BANKNIFTY":
                symbol = "^NSEBANK"
            else:
                symbol = "^NSEI"
            symbol_ltp = get_symbol_ltp(symbol)
            print(symbol_ltp)
#             print(rows)
            begin = trueValue - noOfRows
            end = trueValue + noOfRows
            finalRows = rows[begin: end]
            sumCallOi = 0
            sumCallOiChg = 0
            sumCallVol = 0
            sumPutOi = 0
            sumPutOiChg = 0
            sumPutVol = 0
            for row in finalRows:
#                 print(row)
                sumCallOi += float(row["calls"]["oi"])
                sumCallOiChg += float(row["calls"]["oiChng"])
                sumCallVol += float(row["calls"]["vol"])
                sumPutOi += float(row["puts"]["oi"])
                sumPutOiChg += float(row["puts"]["oiChng"])
                sumPutVol += float(row["puts"]["vol"])
#             print(finalRows)
        return jsonify({
        "rows": finalRows,
        "trueValue": trueValue,
        "marketPrice": round(symbol_ltp, 2),
        "sumCallOi": round(sumCallOi, 2),
        "sumCallOiChg": round(sumCallOiChg, 2),
        "sumCallVol": round(sumCallVol, 2),
        "sumPutOi": round(sumPutOi, 2),
        "sumPutOiChg": round(sumPutOiChg, 2),
        "sumPutVol": round(sumPutVol, 2)
         })

@app.route('/options/<index>')
def get_options(index):
     df = pd.read_csv("instruments.csv")
     index_rows = df[df["name"] == index]
     index_rows["expiry"] = pd.to_datetime(index_rows["expiry"], errors='coerce')
     index_rows = index_rows.dropna(subset=["expiry"])
     index_rows = index_rows.sort_values(by="expiry")
     expiry_values = index_rows["expiry"].dt.strftime('%d-%m-%Y').to_list()
     expiry_values = list(set(expiry_values))
     date_objects = sorted([datetime.strptime(x, "%d-%m-%Y") for x in expiry_values])
#      print(date_objects)
     expiry_values = [date.strftime('%d-%m-%Y') for date in date_objects]
#      sys.exit(    )

     return jsonify({"expiry": expiry_values})

if __name__ == "__main__":
    app.run(debug=True, port=5002)
