# 北境冬旅｜旅行手冊

Yulun 和 May 2027/2/25–3/17 北歐＋波蘭冬季旅行的手機版手冊。
GitHub Pages 靜態網站：https://yulunyeh0731.github.io/nordic-trip/
主要在 iPhone 上看，會加到主畫面、旅途中離線使用。May 也會看，文字要讓第一次讀的人看得懂。

## 回覆

一律用繁體中文（台灣用語）回覆、寫 commit 訊息。程式碼、檔名、指令照原樣寫。

## 檔案

- `index.html`：版面、樣式和所有畫面邏輯。單一檔案，沒有建置工具，也沒有外部套件。
- `data.js`：所有行程資料（`window.TRIP`）。欄位說明寫在檔案開頭的註解。
- `sw.js`：離線快取。
- `fonts/serif.woff2`：Noto Serif TC Bold 子集，只包含網站用到的字。
- `tools/make-font.py`：重新產生字型子集的工具。
- `manifest.webmanifest`、`icon-*.png`、`apple-touch-icon.png`：加到主畫面用。

## 必守規則

1. 行程和文字內容只改 `data.js`。只有版面改動才動 `index.html`。
2. 網站是公開的：訂位代號、確認號、票號、信用卡資訊都不能寫進任何檔案。
3. 每次改動都要把 `sw.js` 的 `CACHE` 版本號加 1（例如 `nordic-trip-v7` → `nordic-trip-v8`）。新增的檔案要加進 `ASSETS`。
4. 改了 `index.html` 或 `data.js` 的文字，就要重新產生字型子集，用法見 `tools/make-font.py` 開頭。原字型檔不要 commit。
5. 要能離線使用：不用外部 CDN、外部圖片或任何網路請求。
6. 地名寫中文時，同時寫原文，例如 特羅姆瑟（Tromsø）、格但斯克（Gdańsk）。
7. Evenes 機場一律寫「EVE 機場」。第一次提到時寫「EVE 機場（哈爾斯塔/納爾維克機場，Harstad/Narvik lufthavn Evenes）」，不要用「埃弗內斯」。
8. 價格寫原幣，再加台幣。已付款的寫實際刷卡的台幣金額；估計值要標明是估計。目前匯率：1 挪威克朗約 NT$3.55、1 歐元約 NT$36.6、1 茲羅提約 NT$8。
9. 不確定的資料寫「待確認」或「待補」，不要猜，也不要自己補數字。
10. 日期的星期要對得上 2027 年。整趟都是冬令時間 UTC+1（台灣 UTC+8、杜拜 UTC+4）。

## 資料慣例

- `status`：`booked` 已訂、`pending` 待訂、`self` May 自訂。
- `who`：`Y` 只有 Yulun、`M` 只有 May，沒寫代表兩人一起。
- 每日頁的機場地址卡，是用航班 `from`、`to` 欄位的第二個詞比對機場代碼（例如「特羅姆瑟 TOS」）。寫成「EVE 機場」這種格式時，要另外加 `addr: ["eve-air"]`。
- 費用欄位：`fare` 票種；`cost` 底下是 `orig` 原幣金額、`twd` 台幣刷卡金額（不知道就寫 `null`）、`pax` 人數、`note` 補充、`est` 估計值；`rule` 退改規則；`seat` 座位。

## 設計

- 色彩變數在 `index.html` 的 `:root`。區域色：波蘭用 `--brick`，挪威城市用 `--fjord`，極光區用 `--aurora`。
- 標題和日期用大字明體（`--serif`），內文用系統黑體（`--sans`）。
- 裝飾要保留，不能拿掉：封面的極光線條、民俗花樣條（挪威八角星 `PAT.no`、波蘭剪紙 `PAT.pl`）、各城市的地標剪影（`ART`）。
- 裝飾放在每頁頂端。查資料的表格和清單維持白底，不加裝飾。
- 深色模式要正常，`prefers-color-scheme` 和 `data-theme` 兩種都要顧到。
- 用 390 px 寬檢查：不能出現左右捲動，文字不能被截斷，可以點的東西至少 44 px 高。

## 發布

- 改完直接 commit 並 push 到 `main`，不要開 PR。網站由 `main` 發布，push 後幾分鐘就會更新。
- 如果環境不允許 push 到 `main`，就推到工作分支並開 PR，並告訴我要手動合併。

## 完成前

- 用手機尺寸實際打開各分頁檢查，有改到的頁面都要看。
- 回報時列出改了哪些地方，以及哪些資料標了「待確認」或「待補」。
- 分頁或網址 hash 改了的話，同步更新這份文件。
