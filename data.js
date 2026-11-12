/* 北境冬旅｜手冊資料
   改行程只要改這個檔案，index.html 不用動。
   status：booked 已訂、pending 待訂、self May 自訂
   who：Y 只有 Yulun、M 只有 May，不寫代表兩人一起
   fare 票種、seats 座位 [{ who, no 座位號, win 靠窗 }]、seatNote 座位補充、aircraft 機型、short 費用表和總覽待訂清單用的簡稱（非航班才需要）
   todo：兩人同班但有人還沒訂好時，寫那個人的狀態（例如「May 自訂，開票待確認」），總覽的準備進度就不算已訂
   bag 行李（不知道的欄位不寫，畫面顯示待補）：chkN 託運件數、chkKg 託運公斤、chkCm 託運長寬高合計上限（公分）、chkNote 託運補充（例如計重制）、
     cabN 登機箱件數、cabKg 登機箱公斤、cabDim 登機箱 [長, 寬, 高]（公分）、smlDim 座位下小包 [長, 寬, 高]、smlNote 小包補充、
     sumKg 登機箱＋小包合計公斤、tbd 還不知道時的說明；兩人限額不同時寫成 { Y: {...}, M: {...} }
   cost 費用（交通段、住宿、activities 都可以帶，費用頁自動收集）：
     只寫金額確定的項目（已付款的刷卡金額，或訂單上寫明要付的原幣金額）；查詢價、估計價不放，金額還不確定的項目就不加 cost。
     cat 類別（交通、住宿、租車、活動）、cur 幣別（TWD、NOK、EUR、PLN、USD）、amt 原幣金額、each: true 表示 amt 是每人、
     twd 實際刷卡台幣（還沒付就不寫，畫面用 rates 換算並標「約」；付款後補上 twd 就改用實際金額）、
     who：Y 只有 Yulun、M 只有 May，不寫代表兩人共用、
     pay 付款狀態：paid 已付、later 之後扣款、onsite 現場付；payDate 付款日或扣款日（YYYY-MM-DD）、
     name 費用頁顯示的名稱（不寫就用航班或項目名稱）、note 補充（手續費、購買管道等）、
     rule 退改 { type：free 免費取消、change 改期免費、paid 可付費更改、none 不可退、tbd 待確認；until 期限（YYYY-MM-DDTHH:MM，當地時間）；label 標籤文字（不寫就用預設）；note 補充 }
   stays 住宿：checkin、checkout 入住和退房時間（HH:MM）；kitchen、breakfast、parking、laundry 設施（true 有、false 沒有，也可以寫文字如「含早餐」，不知道就不寫）；
     room 房型、phone 電話、getThere 怎麼去、access 入住方式（自助入住、鑰匙盒等），不知道就不寫
   days.times 重要時間點（色帶「接下來」用）：[{ at "HH:MM"（不知道寫「待補」）, t 說明, who, est: true 推估的時間，畫面寫「建議」 }]
   days.transfers 怎麼去卡（畫面上叫「怎麼去」）：[{ id, who, after 放在第幾段交通後面（-1＝最前面）, leg 對應的航班或車次（資料頁交通連到這張卡）, from, to, sub 趕幾點的什麼,
     opts: [{ n 名稱, rec: true 推薦, steps 怎麼走, time 要多久（車程）, freq 班距（不和車程寫在同一句）, cost 多少錢, pay 怎麼付, fit 適合什麼情況, note 注意 }], warn 注意事項, addr 地址卡（addresses 的 key，或 "stay:<住處 id>"）, checkin 入住提醒 }]
   cities.pois 地點座標：lat、lng；approx: true 表示座標只代表附近一帶（旁邊的廣場或地標），算距離、排序照用，導航改用名稱搜尋（q）
   路線號碼寫成方括號，畫面會換成號碼牌：公車 [160]、電車 [11] [12]、SKM [S2]、輕軌 [1]（只認 1～3 個英數字的號碼）。
     前面寫交通工具，號碼後面不加「號」；分鐘一律帶「分」放在後面。
     怎麼去卡、routes、cities.transit、地點的 line 和 tip、checklist 的 text 和 sub 都可以這樣寫。
   cities.routes 區域之間怎麼走（地區頁的示意路線圖，有寫才顯示；座標照 viewBox 0 0 366 h）：h 圖的高度、foot 圖下小字、
     water 水域，可以有很多塊 [{ points, label, lx, ly, rotate }]、
     nodes 節點 [{ id, kind：area 區域／spot 單一地點／stay 住處／station 車站, area 對應 areas 的 id, stay 對應住處 id, x, y, r 半徑, name 全名, short 簡稱,
       lb 文字 [[dx, dy, 文字（可以有 [xx]）, 字級, 粗細, 對齊]] }]、
     edges 線 [{ id, a、b 兩端節點 id, style：line 粗線／spur 點線／link 住處細虛線／stn 車站細虛線, draw: false 不畫在圖上（只出現在區域卡片的「隔壁」）,
       walk 圖上的步行標籤, bus 圖上的搭車標籤（可以有 [xx]）, lx、ly 步行標籤離線段中點的位移, bx、by 搭車標籤離步行標籤的位移,
       min 步行分鐘, km 步行距離（例如 "2.6 公里"、"400 公尺"）, busMin 搭車全程分鐘, cards 要出現在哪幾區的「隔壁」, row 這一區不是兩端之一時列上寫的文字,
       sheet 半頁卡 { walk 走路經過哪裡（一句，不寫分鐘和距離）, note 搭車那一段只有一句說明時用,
         go 去程、back 回程 { total 全程（例如 "約 20 分"）, steps [[模式：walk 走路／bus 公車／tram 電車, 文字, 分鐘（可以是空字串）]] },
         fare 車票, warn 紅字注意, nav 導航按鈕 [{ t 按鈕文字, q 目的地, mode：walking／transit }] } }]、
     notes 圖上的補充文字 [[x, y, 文字]]
   cities.transit 交通怎麼搭：[{ n 名稱, d 一句說明 }]；cities.drive 自駕區塊、cities.e10 示意圖（羅弗敦）
   checklist：due 是出發前的期限；旅途中的項目改寫 day（YYYY-MM-DD），可加 until 顯示到哪天、eve: true 前一晚做
   我的備忘存在手機的 localStorage：memo:<住處 id>、memo:car
   cities.tips：{ i 圖示（shop、museum、food、cup、sun、aurora、clock、car、rain）, t 一句重點, d 補充說明 }
   activities：沒有固定行程卡的活動（極光團、哈士奇等），date 是排序用的日期，dateText 是顯示的日期
   stays.short：住處簡稱（名稱太長時用，例如城市頁的距離說明）
   cities.ref：城市頁算景點距離用的住處 id，同一城市住兩段時寫成陣列（例如 ["waw1", "waw2"]）
   stays.via：訂房平台（例如 Booking.com、Airbnb、官網），資料頁住宿卡會顯示
   stays.loc：一句位置說明（地區頁住處卡用）
   legs.stops：一日遊依序經過的點（挪威縮影），stopsNote 補充；cities.tour：地區頁要列出的一日遊日期
   checklist.due：期限或建議完成日（YYYY-MM-DD），dueApprox: true 表示是大約的日期
   訂位代號、確認號不要寫進來（網頁是公開的）。 */

window.TRIP = {
  updated: "2026-11-12",
  start: "2027-02-25",
  end: "2027-03-17",
  departures: { Y: "2027-02-25", M: "2027-02-27" },
  people: { Y: "Yulun", M: "May" },
  /* 1 單位外幣約多少台幣；美元沒有匯率，美元金額的台幣顯示金額未知 */
  rates: { NOK: 3.55, EUR: 36.6, PLN: 8.5 },

  regions: {
    tw:  { name: "台灣",     color: "ink", lat: 25.08, lng: 121.23, tz: 8 },
    waw: { name: "華沙",     color: "brick", lat: 52.23, lng: 21.01, tz: 1 },
    osl: { name: "奧斯陸",   color: "fjord", lat: 59.91, lng: 10.75, tz: 1 },
    tos: { name: "特羅姆瑟", color: "aurora", lat: 69.65, lng: 18.96, tz: 1, polar: true },
    lof: { name: "羅弗敦",   color: "aurora", lat: 68.15, lng: 13.70, tz: 1, polar: true },
    bgo: { name: "卑爾根",   color: "fjord", lat: 60.39, lng: 5.32, tz: 1 },
    gdn: { name: "格但斯克", color: "brick", lat: 54.35, lng: 18.65, tz: 1 },
    sky: { name: "回程",     color: "ink" }
  },

  stays: [
    { id: "waw1", loc: "在華沙中央車站（Warszawa Centralna）附近", who: "Y", area: "華沙", name: "Mercure Warszawa Centrum", short: "Mercure", from: "2027-02-26", nights: 2,
      address: "Złota 48/54, 00-120 Warszawa", lat: 52.23095, lng: 21.00123, status: "booked", via: "Agoda",
      room: "Classic Standard Double，22 平方公尺，1 張大床", breakfast: false, phone: "+48 22 697 3999",
      checkin: "15:00", checkout: "12:00",
      note: "24 小時櫃台，可寄放行李；在中央車站（Warszawa Centralna）附近",
      cost: { cat: "住宿", cur: "TWD", amt: 3826.88, twd: 3826.88, who: "Y", pay: "paid", payDate: "2026-11-05",
        rule: { type: "free", until: "2027-02-24T23:59", note: "華沙時間；2/25 起取消收第 1 晚房費，2/26 起不可退款" } } },
    { id: "osl", loc: "從奧斯陸中央車站（Oslo S）走約 500 公尺", area: "奧斯陸", name: "Bob W Oslo Sentralen", from: "2027-02-28", nights: 2, status: "booked", via: "Klook",
      address: "Kirkegata 30, 0153 Oslo", lat: 59.911, lng: 10.745,
      room: "雙人房，1 張大床", kitchen: "沒有廚房，有熱水壺", breakfast: false,
      phone: "+47 23 50 70 98", checkin: "15:00", checkout: "11:00",
      note: "自助入住：先線上報到，用手機開房門",
      cost: { cat: "住宿", cur: "TWD", amt: 5529, twd: 5529, pay: "paid", payDate: "2026-11-04", note: "Klook", rule: { type: "none", note: "不可退款" } } },
    { id: "tos", loc: "樓下有公車，搭到市中心約 12 分鐘；走路到大教堂約 26 分鐘（1.9 公里）", area: "特羅姆瑟", name: "Sjøparken 獨立房間", from: "2027-03-02", nights: 3, status: "booked", via: "Airbnb",
      address: "Strandvegen 114B, 9006 Tromsø", lat: 69.6361, lng: 18.9351,
      room: "獨立房間，浴室和房東共用", kitchen: "廚房設備齊全", breakfast: false,
      phone: "+47 41 34 07 10", checkin: "15:00", checkout: "12:00",
      note: "房東 Hans-Erik，入住前 2～3 天傳入住資訊；房東同意約 12:30 抵達",
      cost: { cat: "住宿", cur: "TWD", amt: 17710.79, pay: "later", payDate: "2027-02-17", note: "Airbnb",
        rule: { type: "free", until: "2027-02-25T15:00", note: "3/2 15:00 前取消可拿回部分退款" } } },
    { id: "lof1", loc: "在 Gimsøy，門牌和高爾夫球場同號，導航用座標", area: "羅弗敦", name: "Lofoten Links Lodges", from: "2027-03-05", nights: 1, status: "booked", via: "Booking.com",
      address: "Hov Tore Hjortsvei 389, 8314 Gimsøy", lat: 68.3404, lng: 14.1285,
      room: "Luxury Standard Lodge，私人衛浴，共用廚房和客廳", kitchen: "共用廚房", breakfast: false, parking: true,
      phone: "+47 76 07 20 02", checkin: "16:00", checkout: "11:00",
      note: "餐廳冬季關閉，晚餐自己煮。門牌和高爾夫球場同號，導航用座標 68.3404, 14.1285",
      cost: { cat: "住宿", cur: "NOK", amt: 1912.5, pay: "later", note: "含 12% 加值稅",
        rule: { type: "free", until: "2027-02-02T23:59", note: "2/3 起取消收 50%，未入住收全額" } } },
    { id: "lof2", loc: "在雷訥（Reine）旁的薩克里索伊（Sakrisøy）小島", area: "羅弗敦", name: "Sakrisøy Rorbuer", from: "2027-03-06", nights: 2, status: "booked", via: "Booking.com",
      address: "Sakrisøya 2, 8390 Reine", lat: 67.9409, lng: 13.1111,
      room: "海景傳統小屋，附陽台", kitchen: "簡易廚房（灶台、烤箱、冰箱）", breakfast: false, parking: "免費（不可預約）",
      phone: "+47 90 03 54 19", checkin: "15:00", checkout: "11:00",
      note: "冬季入住時間和拿鑰匙方式待確認。有住客說鑰匙是放在接待處旁的信箱（夏季的評價）。",
      cost: { cat: "住宿", cur: "NOK", amt: 6356.79, pay: "later", note: "房價 NOK 6,980 扣掉 Booking.com 折抵 623.21；住宿開的發票會顯示全額",
        rule: { type: "free", until: "2027-02-20T00:00", note: "入住 14 天前，確切時間看訂單頁；之後取消或未入住收全額" } } },
    { id: "lof3", loc: "在群島東北岸的 Laukvik", area: "羅弗敦", name: "Laukvik Suites", from: "2027-03-08", nights: 2, status: "booked", via: "Booking.com",
      address: "Laukvikveien 3B, 8315 Laukvik", lat: 68.3874, lng: 14.4121,
      room: "單臥室公寓，私人衛浴", kitchen: "廚房（灶台、烤箱、洗碗機）", breakfast: false, parking: true,
      phone: "+47 93 45 81 79", checkin: "15:00", checkout: "12:00",
      note: "入住 15:00～22:00；有洗衣機、烘衣機",
      cost: { cat: "住宿", cur: "NOK", amt: 2575.8, pay: "paid", payDate: "2026-11-04", note: "含 12% 加值稅", rule: { type: "none", note: "不可退款、不可改日期" } } },
    { id: "bgo", loc: "走到輕軌 Byparken 站約 3 分鐘", area: "卑爾根", name: "Ole Bull Hotel & Apartments", from: "2027-03-10", nights: 2, status: "booked", via: "Agoda",
      address: "Øvre Ole Bulls plass 3, 5012 Bergen", lat: 60.392, lng: 5.322,
      room: "Standard Twin Room，已要求 2 張單人床", kitchen: "有廚房（住客評價）", breakfast: false,
      phone: "+47 55 23 16 13", checkin: "15:00", checkout: "11:00",
      note: "走到輕軌 Byparken 站約 3 分鐘；可寄放行李",
      cost: { cat: "住宿", cur: "TWD", amt: 6198.94, twd: 6198.94, pay: "paid", payDate: "2026-11-05", note: "含稅，Agoda 促銷 12%", rule: { type: "none", note: "不可退款、不可更改" } } },
    { id: "gdn", loc: "走到格但斯克中央車站（Gdańsk Główny）約 4 分鐘", area: "格但斯克", name: "Craft Beer Central Hotel", from: "2027-03-12", nights: 2, status: "booked", via: "Klook",
      address: "Podwale Grodzkie 4, 80-895 Gdańsk", lat: 54.354, lng: 18.645,
      room: "雙人或雙床房（Pils），已要求 2 張單人床", breakfast: false,
      phone: "+48 58 351 09 10", checkin: "15:00", checkout: "11:00",
      note: "24 小時櫃台，可寄放行李；走到中央車站約 4 分鐘。城市稅到店付（每人每晚約 PLN 3.3～3.5）",
      cost: { cat: "住宿", cur: "TWD", amt: 4734, twd: 4734, pay: "paid", payDate: "2026-11-05", note: "合計 4,983 扣掉 Klook 付款優惠 249", rule: { type: "none", note: "不可更改或取消" } } },
    { id: "waw2", loc: "走到國家博物館約 2 分鐘，在新世界街（Nowy Świat）一帶", area: "華沙", name: "Chopin Boutique", from: "2027-03-14", nights: 2, status: "booked", via: "Agoda",
      address: "Smolna 14, 00-375 Warszawa", lat: 52.233, lng: 21.024,
      room: "高級雙人房，已要求 2 張單人床", breakfast: true,
      checkin: "15:00", checkout: "11:00",
      note: "1910 年老建築，走到國家博物館約 2 分鐘。館內 Chopin Salon 每晚 19:00 蕭邦音樂會（房客 PLN 70，常客滿，建議提早訂）。Email info@bbwarsaw.com",
      cost: { cat: "住宿", cur: "TWD", amt: 7708.76, twd: 7708.76, pay: "paid", payDate: "2026-11-05", note: "含稅，Agoda 促銷 12%", rule: { type: "none", note: "不可退款、不可更改" } } }
  ],

  activities: [
    { id: "aurora", name: "極光團（特羅姆瑟 Tromsø）", date: "2027-03-02", dateText: "3/2～3/4 挑一晚", status: "pending" },
    { id: "husky", name: "哈士奇雪橇", date: "2027-03-04", dateText: "3/4", status: "pending" }
  ],

  days: [
    { date: "2027-02-25", sunAt: "tw", title: "Yulun 出發",
      alerts: ["Yulun 20:00 前到桃園第二航廈"], region: "tw",
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          bag: { chkKg: 25, chkNote: "計重制", cabN: 1, cabKg: 7, cabDim: [55, 38, 22], smlNote: "票面只列 1 件手提" }, status: "booked",
          fare: "Saver",
          cost: { cat: "交通", name: "阿聯酋 Yulun 來回 4 段", cur: "TWD", amt: 27236, twd: 27236, who: "Y", pay: "paid", payDate: "2026-10-18", note: "含稅", rule: { type: "tbd" } } }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場"] },

    { date: "2027-02-26",
      transfers: [
        {
          "id": "t-dxb-y",
          "who": "Y",
          "after": -1,
          "leg": "EK179",
          "from": "杜拜機場第三航廈",
          "to": "轉機登機門",
          "sub": "轉機約 3 小時，趕 07:50 EK179",
          "opts": [
            {
              "n": "在第三航廈轉機",
              "rec": true,
              "steps": [
                "下飛機跟著「Connections」指示走。",
                "已經有登機證，走 Passengers with Boarding Pass，再過一次安檢後到登機門；沒有登機證就到轉機櫃台辦。",
                "第三航廈不廣播登機，要自己看螢幕。A、B、C 三區之間可能要搭區間車。"
              ]
            }
          ],
          "warn": "阿聯酋的航班都在第三航廈。"
        },
        {
          "id": "t-waw-in",
          "who": "Y",
          "after": 0,
          "leg": "EK179",
          "from": "華沙機場",
          "to": "Mercure Warszawa Centrum（Złota 48/54）",
          "sub": "11:30 落地，A 航廈",
          "opts": [
            {
              "n": "SKM 通勤火車",
              "rec": true,
              "steps": [
                "機場航廈地下就是車站。",
                "搭 SKM [S3] 到華沙中央車站（Warszawa Centralna），或搭 SKM [S2] 到 Warszawa Śródmieście，兩站相鄰。",
                "下車走到旅館。"
              ],
              "time": "車程約 25 分鐘",
              "cost": "ZTM 75 分鐘票 PLN 4.40（約 NT$37）；20 分鐘票不夠",
              "pay": "車站售票機或 Jakdojade app"
            },
            {
              "n": "Bolt／計程車",

              "cost": "一台約 PLN 50～80（約 NT$425～680）",
              "pay": "Bolt app 綁卡",
              "fit": "行李多、累了不想轉車"
            }
          ],
          "warn": "SKM 偶爾會臨時關閉 Centralna 站，出發前一週查 SKM 公告。",
          "addr": [
            "waw-air",
            "stay:waw1"
          ],
          "checkin": "15:00 才能入住，先寄放行李（24 小時櫃台）。"
        }
      ],
      times: [{ at: "11:30", who: "Y", t: "抵達華沙" }], title: "Yulun 抵達華沙", region: "waw", city: "waw",
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK179",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "07:50",
          to: "華沙 WAW", toNote: "A 航廈", arr: "11:30",
          bag: { chkKg: 25, chkNote: "計重制", cabN: 1, cabKg: 7, cabDim: [55, 38, 22], smlNote: "票面只列 1 件手提" }, status: "booked" },

      ],
      free: [{ who: "Y", when: "下午～晚上", text: "抵達後在住處附近走走，調時差", areas: ["centrum", "old"] }] },

    { date: "2027-02-27", times: [{ at: "23:00", who: "M", t: "從台北出發" }], title: "Yulun 華沙一日；May 深夜出發",
      alerts: ["May 20:00 前到桃園第二航廈"], region: "waw", city: "waw",
      free: [{ who: "Y", when: "全天", text: "週六博物館都有開。May 這天還沒到，Yulun 自己想看的展館排在今天", areas: ["old", "powisle", "centrum"] }],
      legs: [
        { who: "M", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          bag: { tbd: "依她的票種，待確認" }, status: "self", statusText: "May 自訂，開票待確認" }
      ] },

    { date: "2027-02-28",
      transfers: [
        {
          "id": "t-dxb-m",
          "who": "M",
          "after": -1,
          "leg": "EK159",
          "from": "杜拜機場第三航廈",
          "to": "轉機登機門",
          "sub": "May 轉機，時間待補",
          "opts": [
            {
              "n": "在第三航廈轉機",
              "rec": true,
              "steps": [
                "下飛機跟著「Connections」指示走。",
                "已經有登機證，走 Passengers with Boarding Pass，再過一次安檢後到登機門；沒有登機證就到轉機櫃台辦。",
                "第三航廈不廣播登機，要自己看螢幕。A、B、C 三區之間可能要搭區間車。"
              ]
            }
          ],
          "warn": "阿聯酋的航班都在第三航廈。"
        },
        {
          "id": "t-waw-out",
          "who": "Y",
          "after": 0,
          "leg": "DY1019",
          "from": "Mercure",
          "to": "華沙機場",
          "sub": "趕 14:25 DY1019",
          "opts": [
            {
              "n": "SKM 通勤火車",
              "rec": true,
              "steps": [
                "12:00 退房，建議 12:00 前出門（推估）。",
                "走到華沙中央車站（Warszawa Centralna）搭 SKM [S3]，或到 Warszawa Śródmieście 搭 SKM [S2]，往機場方向。",
                "坐到機場站，上樓就是航廈。"
              ],
              "time": "車程約 25 分鐘",
              "cost": "ZTM 75 分鐘票 PLN 4.40（約 NT$37）",
              "pay": "車站售票機或 Jakdojade app"
            },
            {
              "n": "Bolt／計程車",
              "cost": "一台約 PLN 50～80（約 NT$425～680）",
              "pay": "Bolt app 綁卡",
              "fit": "行李多、時間比較趕"
            }
          ],
          "warn": "SKM 偶爾會臨時關閉 Centralna 站，前一天查 SKM 公告。",
          "addr": [
            "stay:waw1",
            "waw-air"
          ]
        },
        {
          "id": "t-osl-in",
          "after": 1,
          "leg": "DY1019",
          "from": "奧斯陸機場",
          "to": "Bob W Oslo Sentralen（Kirkegata 30）",
          "sub": "May 12:10 先到，Yulun 16:20 到",
          "opts": [
            {
              "n": "Vy 區域火車",
              "rec": true,
              "steps": [
                "機場航廈旁就是火車站，搭往奧斯陸中央車站（Oslo S）的 Vy 區域火車。",
                "在 Oslo S 下車，出站走約 500 公尺到 Bob W。"
              ],
              "time": "約 23～30 分鐘",
              "cost": "每人約 NOK 122～129（約 NT$435～460，各網站不一）；兩人合計約 NOK 244～258（約 NT$866～916）",
              "pay": "Vy 或 Ruter app"
            },
            {
              "n": "機場快線 Flytoget",
              "time": "19～22 分鐘",
              "cost": "每人約 NOK 243～258（約 NT$865～915）；兩人合計約 NOK 486～516（約 NT$1,725～1,832）",
              "pay": "Flytoget app 或月台售票機",
              "note": "Flytoget 和 Vy 的票不通用。"
            }
          ],
          "warn": "2/25～2/28 地鐵停駛，但從 Oslo S 用走的不受影響。",
          "addr": [
            "osl-air",
            "osl-st",
            "stay:osl"
          ],
          "checkin": "15:00 才能入住，May 先寄放行李（能不能寄放待確認，見清單）。"
        }
      ],
      times: [{ at: "12:00", who: "Y", t: "前出門", est: true }, { at: "12:10", who: "M", t: "抵達奧斯陸" }, { at: "14:25", who: "Y", t: "DY1019 起飛" }], title: "飛奧斯陸，兩人會合", city: "osl",
      region: "osl",
      legs: [
        { who: "M", t: "flight", carrier: "阿聯酋", no: "EK159",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "待補",
          to: "奧斯陸 OSL", arr: "12:10",
          bag: { tbd: "依她的票種，待確認" }, status: "self", statusText: "May 自訂，開票待確認" },
        { who: "Y", t: "flight", carrier: "挪威航空", no: "DY1019",
          from: "華沙 WAW", dep: "14:25", to: "奧斯陸 OSL", arr: "16:20",
          seats: [{ who: "Y", no: "8F" }],
          bag: { chkN: 1, chkKg: 23, cabDim: [55, 40, 23], smlDim: [30, 20, 40], sumKg: 10 }, status: "booked",
          fare: "LowFare+", cost: { cat: "交通", cur: "USD", amt: 129.48, who: "Y", pay: "paid", payDate: "2026-10-18", twd: 4204, note: "含刷卡手續費 USD 2.58", rule: { type: "paid", note: "不可退款，可付費更改" } } }
      ],
      notes: ["兩人都降落奧斯陸機場（Gardermoen），May 早到約 4 小時。May 會比 Yulun 早到，先自己進市區。"],
      free: [{ who: "M", when: "下午", text: "May 先到：國家博物館週日開到 17:00，想看的話今天是機會", areas: ["sentrum", "bjorvika"] }, { when: "晚上", text: "會合後回住處，週日只有小超市開", areas: ["bjorvika"] }] },

    { date: "2027-03-01", title: "奧斯陸市區、咖啡", region: "osl", city: "osl",
      free: [{ when: "全天", text: "週一國家博物館休館，孟克美術館有開。早上去 Grünerløkka 喝咖啡，下午歌劇院和孟克", areas: ["lokka", "bjorvika", "sentrum", "frogner"] }] },

    { date: "2027-03-02",
      transfers: [
        {
          "id": "t-osl-out",
          "after": -1,
          "leg": "DY372",
          "from": "Bob W",
          "to": "奧斯陸機場",
          "sub": "趕 10:30 DY372",
          "opts": [
            {
              "n": "走到 Oslo S 搭火車",
              "rec": true,
              "steps": [
                "走到奧斯陸中央車站（Oslo S），約 08:30 上車。",
                "搭 Vy 區域火車或 Flytoget 到機場。"
              ],
              "time": "走路約 500 公尺＋車程 19～30 分鐘",
              "cost": "同來程：Vy 每人約 NOK 122～129（約 NT$435～460），Flytoget 每人約 NOK 243～258（約 NT$865～915）",
              "pay": "Vy、Ruter 或 Flytoget app"
            }
          ],
          "warn": "鐵路偶爾因維修或罷工停駛，前一天看 Vy 公告。",
          "addr": [
            "stay:osl",
            "osl-st",
            "osl-air"
          ]
        },
        {
          "id": "t-tos-in",
          "after": 0,
          "leg": "DY372",
          "from": "特羅姆瑟機場",
          "to": "Sjøparken（Strandvegen 114B）",
          "sub": "12:30 落地",
          "opts": [
            {
              "n": "計程車",
              "rec": true,
              "steps": [
                "入境大廳外就有計程車排班站。",
                "地址給司機看：Strandvegen 114B。"
              ],
              "time": "約 10～15 分鐘",
              "cost": "到市中心各來源寫 NOK 250～410（約 NT$888～1,456）；住處在市中心再往南約 1 公里，會稍貴一點。兩人分攤每人約 NOK 125～205（約 NT$444～728）",
              "pay": "可刷卡",
              "fit": "兩人帶大行李最省事。價錢和兩人搭機場巴士差不多，但直接送到門口。"
            },
            {
              "n": "市區公車 [40] [42]",
              "steps": [
                "站牌不在航廈門口：出入境大廳左轉走幾步，看到標示停車場的樓梯，下去就是站牌。",
                "搭往市中心（Sentrum）方向的車，不要搭往 Kvaløya、Slettaelva、Eidkjosen 的方向。",
                "在 Polaria 站下車，約 15 分鐘。",
                "換公車 [33] 往南坐 1～2 站，在 Lanesbukta 下車（旁邊是 Eurospar 超市）；或沿 Strandvegen 平路走約 1 公里。",
                "公車 [40] 有可能直接開到 Lanesbukta：當天在 Google 地圖輸入住址，顯示 [40] 直達就不用在 Polaria 下車。"
              ],
              "time": "到 Polaria 約 15 分鐘，加轉車或走路",
              "cost": "每人 NOK 50（約 NT$178）；平日 9:00–14:00、17:00–01:00 離峰每人 NOK 30（約 NT$107）。3/2 週二 14:00 前上車，兩人 NOK 60（約 NT$213）",
              "pay": "Svipper app 或感應式信用卡，車上不收現金",
              "fit": "最便宜。車上放大行李的空間不多，司機可以拒載。"
            },
            {
              "n": "機場巴士 Airport Express",
              "steps": [
                "紅色巴士，在入境大廳旁上車，13:00、13:40、14:10 發車（12:20 那班趕不上）。",
                "最南只停到 Polaria，下車後和公車一樣要換公車 [33]，或拖行李走約 1 公里。"
              ],
              "time": "約 15～20 分鐘到 Polaria",
              "cost": "每人 NOK 125（約 NT$444）；兩人 NOK 250（約 NT$888）",
              "pay": "只能刷卡",
              "fit": "不推薦：兩人的錢和計程車差不多，卻送不到門口。"
            }
          ],
          "addr": [
            "tos-air",
            "stay:tos"
          ],
          "checkin": "房東同意約 12:30 抵達。"
        }
      ],
      times: [{ at: "08:30", t: "在奧斯陸中央車站（Oslo S）上車" }, { at: "10:30", t: "DY372 起飛" }], title: "飛特羅姆瑟", city: "tos",
      region: "tos",
      legs: [
        { t: "flight", carrier: "挪威航空", no: "DY372",
          from: "奧斯陸 OSL", dep: "10:30", to: "特羅姆瑟 TOS", arr: "12:30",
          seats: [{ who: "M", no: "8A", win: true }, { who: "Y", no: "8B" }],
          bag: { chkN: 1, chkKg: 23, cabDim: [55, 40, 23], smlDim: [30, 20, 40], sumKg: 10 }, status: "booked",
          fare: "LowFare+", cost: { cat: "交通", cur: "EUR", amt: 162.78, twd: 5962, pay: "paid", payDate: "2026-11-02", note: "含刷卡手續費 EUR 3.62", rule: { type: "paid", note: "不可退款，可付費更改" } } }
      ],
      free: [{ when: "下午", text: "放好行李後市區走走、去超市採買", areas: ["centre"] }] },

    { date: "2027-03-03", title: "特羅姆瑟，挑晴天報極光團", region: "tos", city: "tos",
      plan: ["看雲量預報，挑最晴的一晚報極光團",
             "選小團、評價高、可改期的業者，報名前問清楚會不會跨境追晴天。Flexitour 是候選（出發 24 小時前取消可退 95%）"],
      free: [{ when: "白天", text: "晚上可能跟團，白天輕鬆一點", areas: ["centre", "tromsdalen"] }] },

    { date: "2027-03-04", title: "哈士奇雪橇", region: "tos", city: "tos",
      plan: ["哈士奇雪橇", "極光團沒看到的話再報一次"],
      notes: ["隔天 10:55 要搭飛機。極光團常常半夜才回到市區，第一次報團最好排 3/2 或 3/3，今晚留給沒看到時再報"],
      free: [{ when: "白天", text: "沒排哈士奇的時段，可以上纜車或逛市區", areas: ["tromsdalen", "centre"] }] },

    { date: "2027-03-05",
      transfers: [
        {
          "id": "t-tos-out",
          "after": -1,
          "leg": "WF863",
          "from": "Sjøparken",
          "to": "特羅姆瑟機場",
          "sub": "趕 10:55 WF863",
          "opts": [
            {
              "n": "前一晚預約計程車",
              "rec": true,
              "steps": [
                "前一晚打電話預約：Tromsø Taxi 03011、Din Taxi 02045。",
                "建議 09:00 前出門（推估）。"
              ],
              "cost": "到市中心各來源寫 NOK 250～410（約 NT$888～1,456），住處稍遠一點；兩人分攤每人約 NOK 125～205（約 NT$444～728）"
            },
            {
              "n": "機場巴士",
              "steps": [
                "Polaria 09:10 或 Prostneset 09:07 上車，09:30 到機場。",
                "從住處到 Polaria：樓下 Lanesbukta 站搭公車 [34] 往北坐 1～2 站；或沿 Strandvegen 走約 1 公里，約 15 分鐘。"
              ],
              "cost": "每人 NOK 125（約 NT$444）；兩人合計 NOK 250（約 NT$888）",
              "pay": "只能刷卡",
              "note": "下一班 09:37 → 10:00，搭 10:55 的飛機太趕。"
            },
            {
              "n": "市區公車 [42]",
              "steps": [
                "從住處到 Polaria（同上）。",
                "在 Polaria 搭公車 [42] 往機場（Tromsø lufthavn）。"
              ],
              "time": "車程約 15 分鐘",
              "freq": "白天約 15 分鐘一班",
              "cost": "每人 NOK 50（約 NT$178）；09:00 後是離峰，每人 NOK 30（約 NT$107）",
              "pay": "Svipper app 或感應式信用卡，車上不收現金",
              "fit": "最便宜，但要轉車、拖行李，搭 10:55 的飛機時間比較緊。"
            }
          ],
          "warn": "DHC-8 小飛機，登機箱可能在登機門被收去託運，證件和行動電源放隨身小包。",
          "addr": [
            "stay:tos",
            "tos-air"
          ]
        },
        {
          "id": "t-eve-lof1",
          "after": 1,
          "leg": "WF863",
          "from": "EVE 機場取車",
          "to": "Lofoten Links Lodges（Gimsøy）",
          "sub": "自駕",
          "opts": [
            {
              "n": "自駕 E10",
              "rec": true,
              "steps": [
                "EVE 機場取車後沿 E10 往西開。",
                "途中在斯沃爾韋爾（Svolvær）採買，有 Kiwi、Rema 1000、Coop Mega，營業時間出發前再查。",
                "過了 Svolvær 繼續往西到 Gimsøy。",
                "沒買齊的話，同島的 Gimsøy Landhandel 雜貨店全年 24 小時營業，有雜貨和加油（兩個來源都這樣寫）。"
              ],
              "time": "約 205～210 公里，好路況約 3 小時；下雪要多抓 1 小時以上"
            }
          ],
          "warn": "往 EVE 路上的 Raftsundet 橋、Gimsøy 的 Gimsøystraumen 橋，強風時會封橋，沒有替代道路。",
          "addr": [
            "eve-air",
            "stay:lof1"
          ],
          "checkin": "16:00 起入住，最晚 23:30。小屋餐廳冬季關閉，晚餐自己煮。"
        }
      ],
      times: [{ at: "09:00", t: "前出門", est: true }, { at: "10:55", t: "WF863 起飛" }, { at: "12:15", t: "取車" }], region: "lof", title: "飛 EVE 機場取車，進羅弗敦", city: "lof",
      legs: [
        { t: "flight", carrier: "Widerøe", no: "WF863",
          from: "特羅姆瑟 TOS", dep: "10:55", to: "EVE 機場", toNote: "哈爾斯塔/納爾維克機場", arr: "12:15", addr: ["eve-air"], via: "安德內斯（20 分鐘，不換飛機）",
          seatNote: "還沒選", aircraft: "DHC-8 螺旋槳小飛機",
          bag: { chkN: 1, chkKg: 23, chkCm: 158, cabDim: [55, 40, 20], smlDim: [40, 30, 15], sumKg: 8 }, status: "booked",
          fare: "Smart", cost: { cat: "交通", cur: "NOK", amt: 1324, twd: 4706, pay: "paid", payDate: "2026-11-02", note: "含服務費", rule: { type: "none", note: "不可退款、不可改票" } } },
        { t: "car", text: "EVE 機場取車（四驅、自排、雪胎），沿 E10 開到 Gimsøy 的 Lofoten Links Lodges", status: "pending", short: "EVE 機場租車" }
      ],
      notes: ["DHC-8 螺旋槳小飛機，置物櫃小，登機箱可能在登機門被收去託運。證件、貴重物品、行動電源放隨身小包"],
      free: [{ when: "傍晚", text: "13:00 左右取到車的話，大約 17:00～17:30 到住處，當天日落 17:22。在斯沃爾韋爾（Svolvær）採買要快，路上不要多停。小屋餐廳冬季關閉，晚餐用共用廚房自己煮（16:00 起入住）。", areas: ["west", "mid", "east"] }] },

    { date: "2027-03-06",
      transfers: [
        {
          "id": "t-lof1-lof2",
          "after": -1,
          "from": "Lofoten Links",
          "to": "Sakrisøy Rorbuer",
          "sub": "11:00 前退房，自駕",
          "opts": [
            {
              "n": "自駕 E10",
              "rec": true,
              "steps": [
                "11:00 前退房，沿 E10 往西。",
                "想看羅弗敦美術館：先往東到亨寧斯韋爾（約 30 分鐘），11:00 開門。從亨寧斯韋爾到 Sakrisøy 約 116 公里、2 小時。",
                "時間夠再去：Borg 的洛弗特維京博物館，就在 E10 旁。",
                "途中在 Leknes 採買 3/7 週日的食物，Leknes 有 Coop Extra、Rema 1000 等。",
                "加油在 Leknes 或雷訥（Reine）。"
              ],
              "time": "直接開約 103 公里、1 小時 45 分；先繞亨寧斯韋爾的話，總共約 2.5 小時"
            }
          ],
          "addr": [
            "stay:lof1",
            "stay:lof2"
          ],
          "checkin": "15:00～23:00 入住，冬季入住方式待確認。"
        }
      ],
      times: [{ at: "11:00", t: "前退房" }], title: "羅弗敦自駕，週六先採買", region: "lof", city: "lof",
      free: [{ when: "全天", text: "11:00 前退房。想看羅弗敦美術館（Galleri Lofoten）的話只有今天：先往東開約 30 分鐘到亨寧斯韋爾（Henningsvær），美術館 11:00 開；看完再往西開到薩克里索伊（Sakrisøy），約 2 小時，15:00 起入住。途中經過 Borg 的洛弗特維京博物館，時間夠再進去。週六：記得在 Leknes 把 3/7 週日的食物先買好。兩個館 2027 年的開放時間出發前都要再查。", areas: ["west", "mid", "east"] }] },

    { date: "2027-03-07", title: "羅弗敦，週日店家少", region: "lof", city: "lof",
      free: [{ when: "全天", text: "週日大型超市不開。看雲量往晴的一側開，中段的烏塔克萊夫（Uttakleiv）、豪克蘭海灘（Haukland）可以停一停", areas: ["west", "mid", "east"] }] },

    { date: "2027-03-08",
      transfers: [
        {
          "id": "t-lof2-lof3",
          "after": -1,
          "from": "Sakrisøy",
          "to": "Laukvik Suites",
          "sub": "11:00 前退房，自駕",
          "opts": [
            {
              "n": "自駕 E10",
              "rec": true,
              "steps": [
                "11:00 前退房，沿 E10 往東。",
                "途中在斯沃爾韋爾（Svolvær）採買；Laukvik 的 Coop Marked 週一～五 10:00～18:00（資料年份不明）。"
              ],
              "time": "約 154 公里，好路況約 2.5 小時"
            }
          ],
          "addr": [
            "stay:lof2",
            "stay:lof3"
          ],
          "checkin": "15:00～22:00 入住，最晚 22:00，追極光繞路要注意時間。"
        }
      ],
      times: [{ at: "11:00", t: "前退房" }], title: "羅弗敦，新月", city: "lof",
      alerts: ["新月，整趟最暗的一夜"], region: "lof",
      free: [{ when: "全天", text: "11:00 前退房，往東開到 Laukvik Suites（15:00～22:00 入住），約 154 公里，是羅弗敦開最久的一段，建議上午就出發、天黑前到。途中在斯沃爾韋爾（Svolvær）採買。晚上新月，天氣好的話在住處外面就能等極光。", areas: ["west", "mid", "east"] }] },

    { date: "2027-03-09", title: "羅弗敦最後一天", region: "lof", city: "lof",
      free: [{ when: "全天", text: "看天氣決定往哪邊走。去亨寧斯韋爾（Henningsvær）可以逛村子、喝咖啡，但羅弗敦美術館週二多半沒開。隔天中午前要開回 EVE 機場還車：Laukvik 到 EVE 機場約 167 公里，正常路況 2.5～3 小時；3/10 計畫 08:00 出發。", areas: ["west", "mid", "east"] }] },

    { date: "2027-03-10",
      transfers: [
        {
          "id": "t-lof3-eve",
          "after": -1,
          "leg": "WF1365",
          "from": "Laukvik",
          "to": "EVE 機場還車",
          "sub": "08:00 出發，中午前還車，13:55 起飛",
          "opts": [
            {
              "n": "自駕 E10",
              "rec": true,
              "steps": [
                "前一晚查 175 路況（vegvesen.no，也可撥 175）和 yr.no 天氣。",
                "3/9 先在斯沃爾韋爾（Svolvær）加滿油。",
                "08:00 出發，中午前還車。"
              ],
              "time": "約 167 公里，正常路況 2.5～3 小時"
            }
          ],
          "warn": "預報有暴風雪時，可改住機場附近（例如 Evenes Sure Best Western）。",
          "addr": [
            "stay:lof3",
            "eve-air"
          ]
        },
        {
          "id": "t-bgo-in",
          "after": 1,
          "leg": "WF1365",
          "from": "卑爾根機場",
          "to": "Ole Bull Hotel（Øvre Ole Bulls plass 3）",
          "sub": "16:40 落地",
          "opts": [
            {
              "n": "輕軌 Bybanen [1]",
              "rec": true,
              "steps": [
                "上車前用 Skyss app 或月台售票機買票（用新的 Skyss app；舊的 Skyss Billett 2026 年秋天停用），單程票效期 60 分鐘。",
                "坐到終點 Byparken。",
                "下車走約 3 分鐘到旅館。"
              ],
              "time": "約 45 分鐘",
              "cost": "大人每人 NOK 51（約 NT$181）；兩人合計 NOK 102（約 NT$362）",
              "pay": "Skyss app 或月台售票機"
            },
            {
              "n": "機場巴士 Flybussen",
              "time": "20～30 分鐘",
              "cost": "每人約 NOK 189（約 NT$671）；兩人合計約 NOK 378（約 NT$1,342）"
            },
            {
              "n": "計程車",
              "cost": "一台約 NOK 400～600（約 NT$1,420～2,130）；兩人分攤每人約 NOK 200～300（約 NT$710～1,065）"
            }
          ],
          "addr": [
            "bgo-air",
            "stay:bgo"
          ]
        }
      ],
      times: [{ at: "08:00", t: "從 Laukvik 出發" }, { at: "12:00", t: "前還車" }, { at: "13:55", t: "WF1365 起飛" }], region: "bgo", title: "還車，飛卑爾根", city: "bgo",
      legs: [
        { t: "car", text: "開回 EVE 機場還車" },
        { t: "flight", carrier: "Widerøe", no: "WF1365",
          from: "EVE 機場", fromNote: "哈爾斯塔/納爾維克機場", addr: ["eve-air"], dep: "13:55", to: "卑爾根 BGO", arr: "16:40", via: "特隆赫姆（25 分鐘，不換飛機）",
          seats: [{ who: "M", no: "12F", win: true }, { who: "Y", no: "12D" }], aircraft: "Embraer 190-E2 噴射機",
          bag: { chkN: 1, chkKg: 23, chkCm: 158, cabDim: [55, 40, 20], smlDim: [40, 30, 15], sumKg: 8 }, status: "booked",
          fare: "Smart", cost: { cat: "交通", cur: "NOK", amt: 2144, twd: 7621, pay: "paid", payDate: "2026-11-02", note: "含服務費", rule: { type: "none", note: "不可退款、不可改票" } } }
      ],
      notes: ["Embraer 190-E2 噴射機，中途停特隆赫姆時留在機上", "機場輕軌到市區終點站 Byparken 約 45 分鐘"],
      free: [{ when: "晚上", text: "搭弗洛伊恩纜車（Fløibanen）上山看夜景，纜車開到 24:00", areas: ["bryggen"] }] },

    { date: "2027-03-11",
      transfers: [
        {
          "id": "t-bgo-st",
          "after": -1,
          "from": "Ole Bull",
          "to": "卑爾根火車站",
          "sub": "趕 08:29 挪威縮影",
          "opts": [
            {
              "n": "走路",
              "rec": true,
              "steps": [
                "建議 08:10 前出門（推估），走路約 10 分鐘。"
              ],
              "time": "約 10 分鐘"
            }
          ],
          "warn": "火車站旁的 Nonneseter 輕軌站 2026 年關閉。",
          "addr": [
            "stay:bgo",
            "bgo-st"
          ]
        }
      ],
      times: [{ at: "08:10", t: "前出門", est: true }, { at: "08:29", t: "挪威縮影火車出發" }], region: "bgo", art: "nutshell", title: "挪威縮影一日", city: "bgo",
      alerts: ["沒有備用日"],
      legs: [
        { t: "tour", text: "挪威縮影一日來回", dep: "08:29", arr: "18:17", status: "pending",
          stops: [
            "<b>卑爾根到沃斯（Voss）</b>：08:29 搭火車，09:41 到沃斯",
            "<b>沃斯到古德旺恩（Gudvangen）</b>：10:10 轉巴士下山，11:10 到峽灣邊",
            "<b>納柔依峽灣（Nærøyfjord）遊船</b>：12:00 開船，14:00 到弗洛姆（Flåm）",
            "<b>弗洛姆鐵路（Flåmsbana）</b>：14:30 出發，15:14 到米達爾（Myrdal）",
            "<b>米達爾回卑爾根</b>：15:56 搭卑爾根鐵路，18:17 回到卑爾根" ],
          stopsNote: "天氣不好或峽灣結冰時，遊船會改成從弗洛姆出發的來回航程，古德旺恩到弗洛姆改搭巴士；改搭 12:00 的弗洛姆來回船，仍接得上 14:30 的鐵路。" }
      ],
      notes: ["冬天遊船可能改航線，不影響行程；比較要擔心的是卑爾根鐵路因冰雪延誤，這次沒有備用日。"] },

    { date: "2027-03-12",
      transfers: [
        {
          "id": "t-bgo-out",
          "after": -1,
          "leg": "W61746",
          "from": "Ole Bull",
          "to": "卑爾根機場",
          "sub": "趕 13:40 W61746",
          "opts": [
            {
              "n": "輕軌 Bybanen [1]",
              "rec": true,
              "steps": [
                "早上可以先寄放行李，去布呂根（Bryggen）或魚市場。",
                "11:00 退房後從 Byparken 搭輕軌，約 11:45 到機場。"
              ],
              "time": "約 45 分鐘",
              "cost": "大人每人 NOK 51（約 NT$181）；兩人合計 NOK 102（約 NT$362）",
              "pay": "Skyss app 或月台售票機"
            }
          ],
          "warn": "威茲航空的託運櫃台起飛前 2 小時才開、40 分鐘前關：11:40 開、13:00 關，登機門 13:10 關。照計畫 11:00 搭輕軌、約 11:45 到機場剛好；Trip.com 建議的 3 小時前到（10:40），櫃台還沒開。",
          "addr": [
            "stay:bgo",
            "bgo-air"
          ]
        },
        {
          "id": "t-gdn-in",
          "after": 0,
          "leg": "W61746",
          "from": "格但斯克機場",
          "to": "Craft Beer Central Hotel（Podwale Grodzkie 4）",
          "sub": "15:25 落地",
          "opts": [
            {
              "n": "公車 [210]",
              "rec": true,
              "steps": [
                "坐往 Dworzec Główny（中央車站）方向。",
                "坐到底站，就在旅館這條街上。"
              ],
              "time": "約 40 分鐘",
              "freq": "平日每小時 2 班、週末每小時 1 班",
              "cost": "ZTM 75 分鐘票每人約 PLN 4.80（約 NT$41，各網站寫 4.80～6）；兩人合計約 PLN 9.60（約 NT$82）",
              "pay": "Jakdojade app 或站牌售票機"
            },
            {
              "n": "PKM 火車",
              "steps": [
                "多數要在 Gdańsk Wrzeszcz 換車。"
              ],
              "cost": "市區票每人 PLN 8.50（約 NT$72）；兩人合計 PLN 17（約 NT$145）"
            },
            {
              "n": "計程車、Bolt",
              "cost": "一台約 PLN 60～120（約 NT$510～1,020，各網站差很多）"
            }
          ],
          "addr": [
            "gdn-air",
            "stay:gdn"
          ]
        }
      ],
      times: [{ at: "11:00", t: "退房、搭輕軌" }, { at: "13:40", t: "W61746 起飛" }], region: "gdn", title: "飛格但斯克", city: "gdn",
      legs: [
        { t: "flight", carrier: "Wizz Air", no: "W61746",
          from: "卑爾根 BGO", dep: "13:40", to: "格但斯克 GDN", arr: "15:25",
          bag: { chkN: 1, chkKg: 32, cabKg: 10, cabDim: [55, 40, 23], smlDim: [40, 30, 20] }, status: "booked",
          fare: "WIZZ PLUS", cost: { cat: "交通", cur: "TWD", amt: 7998, twd: 7998, pay: "paid", payDate: "2026-11-02", note: "Trip.com 購買，刷卡 7,965＋Trip Coins 33", rule: { type: "change", note: "退票透過 Trip.com，手續費 TWD 1,466 起" } } }
      ],
      notes: ["出發前從卑爾根 Byparken 搭機場輕軌，到機場約 45 分鐘"],
      free: [{ when: "上午（卑爾根）", text: "退房後行李寄放旅館，逛布呂根（Bryggen）、魚市場（Fisketorget）。回旅館拿行李，約 11:00 搭輕軌去機場" },
             { when: "傍晚", text: "逛老城長街、河畔", areas: ["main", "river"] }] },

    { date: "2027-03-13", title: "馬爾堡或索波特", region: "gdn", city: "gdn",
      free: [{ when: "全天", text: "馬爾堡或索波特二選一，回來再逛老城", areas: ["trips", "main", "river"] }] },

    { date: "2027-03-14",
      transfers: [
        {
          "id": "t-gdn-waw",
          "after": -1,
          "from": "Craft Beer",
          "to": "Chopin Boutique（Smolna 14）",
          "sub": "格但斯克中央車站 → 火車 → 華沙中央車站",
          "opts": [
            {
              "n": "火車＋公車",
              "rec": true,
              "steps": [
                "走到格但斯克中央車站（Gdańsk Główny）約 4 分鐘。",
                "火車 2.5～3 小時，票約 2/12 開賣，時間待補。",
                "在中央車站前的 Dworzec Centralny 站搭公車 [175]，往 Pl. Piłsudskiego 方向，經 Centrum、Krucza，坐 3 站在 Foksal 下車，走到 Smolna 14。"
              ],
              "time": "火車 2.5～3 小時",
              "cost": "華沙市區 75 分鐘票每人 PLN 4.40（約 NT$37）；兩人合計 PLN 8.80（約 NT$75）；火車票待補"
            },
            {
              "n": "火車＋Bolt",
              "steps": [
                "到華沙中央車站後叫 Bolt 到 Smolna 14。"
              ],
              "cost": "Bolt 一台約 PLN 50～80（約 NT$425～680）"
            }
          ],
          "addr": [
            "stay:gdn",
            "gdn-st",
            "waw-st",
            "stay:waw2"
          ],
          "checkin": "15:00 才能入住，早到的話寄放行李（能不能寄放待確認）。"
        }
      ],
      times: [{ at: "11:00", t: "前退房" }, { at: "待補", t: "火車時間（買票後補）" }], title: "火車到華沙",
      alerts: ["週日商店公休"], region: "waw", city: "waw",
      legs: [
        { t: "train", text: "波蘭國鐵，格但斯克到華沙，約 2.5～3 小時", status: "pending", addr: ["gdn-st", "waw-st"], short: "格但斯克 → 華沙 火車" }
      ],
      free: [{ when: "抵達後", text: "週日博物館有開、商店大多公休。兩人想一起看的展館排在今天", areas: ["old", "powisle"] }],
      notes: ["週日，超市大多公休；Żabka 便利商店通常有開，餐廳不受影響"] },

    { date: "2027-03-15", title: "華沙一日",
      alerts: ["週一博物館休館"], region: "waw", city: "waw",
      free: [{ when: "全天", text: "週一王宮和國家博物館休館，適合公園、觀景台和市區散步", areas: ["centrum", "lazienki", "old"] }] },

    { date: "2027-03-16",
      transfers: [
        {
          "id": "t-waw-out2",
          "after": -1,
          "leg": "EK180",
          "from": "Chopin Boutique",
          "to": "華沙機場",
          "sub": "趕 13:40 EK180",
          "opts": [
            {
              "n": "公車 [175]",
              "rec": true,
              "steps": [
                "阿聯酋建議起飛前 3 小時到機場，建議 10:00 前出門（推估）。",
                "在新世界街（Nowy Świat）上的 Foksal 站搭公車 [175] 往機場（Lotnisko Chopina）方向，從 Pl. Piłsudskiego 到機場全程約 33 分鐘。"
              ],
              "cost": "ZTM 75 分鐘票每人 PLN 4.40（約 NT$37）；兩人合計 PLN 8.80（約 NT$75）",
              "pay": "Jakdojade app 或售票機",
              "note": "2026 年 11 月起王宮之路禁止公車通行，[175] 改道。出發前一天用 Jakdojade 查 Foksal 站往機場方向還有沒有停；沒有的話改到中央車站搭 [175] 或 SKM。"
            },
            {
              "n": "SKM [S2]",
              "steps": [
                "從 Warszawa Śródmieście 搭 SKM [S2] 到機場。"
              ],
              "cost": "每人 PLN 4.40（約 NT$37）"
            },
            {
              "n": "Bolt",
              "cost": "一台約 PLN 50～80（約 NT$425～680）"
            }
          ],
          "addr": [
            "stay:waw2",
            "waw-air"
          ]
        }
      ],
      times: [{ at: "10:00", t: "前出門", est: true }, { at: "13:40", t: "EK180 起飛" }], sunAt: "waw", title: "華沙起飛回台",
      alerts: ["10:40 前到機場"], region: "sky",
      legs: [
        { t: "flight", carrier: "阿聯酋", no: "EK180",
          from: "華沙 WAW", fromNote: "A 航廈", dep: "13:40",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "22:55",
          bag: { Y: { chkKg: 25, chkNote: "計重制", cabN: 1, cabKg: 7, cabDim: [55, 38, 22], smlNote: "票面只列 1 件手提" }, M: { tbd: "依她的票種，待確認" } }, status: "booked", todo: "May 自訂，開票待確認" }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場，也就是 10:40 前"] },

    { date: "2027-03-17",
      transfers: [
        {
          "id": "t-dxb-back",
          "after": -1,
          "leg": "EK366",
          "from": "杜拜機場第三航廈",
          "to": "轉機登機門",
          "sub": "兩人轉機約 4 小時 45 分，趕 03:40 EK366",
          "opts": [
            {
              "n": "在第三航廈轉機",
              "rec": true,
              "steps": [
                "下飛機跟著「Connections」指示走。",
                "已經有登機證，走 Passengers with Boarding Pass，再過一次安檢後到登機門；沒有登機證就到轉機櫃台辦。",
                "第三航廈不廣播登機，要自己看螢幕。A、B、C 三區之間可能要搭區間車。"
              ]
            }
          ],
          "warn": "阿聯酋的航班都在第三航廈。"
        }
      ],
      sunAt: "tw", title: "抵達台北", region: "sky",
      legs: [
        { t: "flight", carrier: "阿聯酋", no: "EK366",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "03:40",
          to: "台北 TPE", toNote: "第二航廈", arr: "15:35",
          bag: { Y: { chkKg: 25, chkNote: "計重制", cabN: 1, cabKg: 7, cabDim: [55, 38, 22], smlNote: "票面只列 1 件手提" }, M: { tbd: "依她的票種，待確認" } }, status: "booked", todo: "May 自訂，開票待確認" }
      ] }
  ],

  /* 城市 → 區域 → 地點
     type：sight 景點、food 吃、cafe 咖啡
     pri：must 必去、maybe 有空再去（景點用）；why：吃和咖啡的去的理由
     when：適合的時段 day 白天、eve 傍晚、night 晚上
     closed：公休的星期（0 週日、1 週一 … 6 週六），手冊會自動標出「當天公休」
     hours 開放時間、price 門票（文字，只在地點卡顯示，不進費用頁）、free 免費時段、tip 補充
     warn 紅字提醒（例如「施工中」）；shut: true 表示目前整個不開（例如整修），會標成沒開
     lat、lng：大約座標，用來算離住處的直線距離 */
  cities: {
    waw: {
      name: "華沙", region: "waw",
      routes: {
        h: 410,
        foot: "公車要先查：王宮之路一帶 2026 年 11 月 7 日起禁止公車通行（到另行通知為止），經過那裡的公車都改道。",
        water: [{ points: [[314, 0], [366, 0], [366, 410], [336, 410]], label: "維斯瓦河（Wisła）", lx: 344, ly: 70, rotate: 85 }],
        nodes: [
          { id: "old", kind: "area", area: "old", x: 184, y: 62, name: "王宮之路與老城", short: "老城",
            lb: [[0, -26, "王宮之路與老城", 14, 700, "middle"], [0, 30, "王宮・老城廣場・聖十字教堂", 10.5, 400, "middle"]] },
          { id: "polin", kind: "spot", area: "old", x: 52, y: 62, r: 8, name: "POLIN 猶太博物館", short: "POLIN",
            lb: [[0, -26, "POLIN", 13, 700, "middle"], [0, 26, "猶太博物館", 10.5, 400, "middle"]] },
          { id: "powisle", kind: "area", area: "powisle", x: 238, y: 180, name: "新世界街一帶", short: "新世界街",
            lb: [[18, -4, "新世界街一帶", 14, 700, "start"], [18, 26, "國家博物館", 10.5, 400, "start"], [18, 41, "蕭邦博物館", 10.5, 400, "start"]] },
          { id: "centrum", kind: "area", area: "centrum", x: 100, y: 262, name: "市中心", short: "市中心",
            lb: [[38, 40, "市中心", 14, 700, "middle"], [38, 56, "科學文化宮・Hala Koszyki", 10.5, 400, "middle"]] },
          { id: "lazienki", kind: "area", area: "lazienki", x: 278, y: 340, name: "瓦津基公園", short: "瓦津基公園",
            lb: [[0, 32, "瓦津基公園", 14, 700, "middle"], [0, 48, "水上宮殿・蕭邦紀念碑", 10.5, 400, "middle"]] },
          { id: "waw1", kind: "stay", stay: "waw1", x: 32, y: 196, name: "Mercure", short: "Mercure",
            lb: [[-18, -46, "Mercure", 12, 700, "start"], [-18, -32, "Yulun 2/26–2/28", 9.5, 400, "start"], [-18, -17, "到老城：走 36 分／公車 [160] 約 20 分", 9.5, 400, "start"]] },
          { id: "waw2", kind: "stay", stay: "waw2", x: 310, y: 128, name: "Chopin Boutique", short: "Chopin Boutique",
            lb: [[12, -22, "Chopin Boutique", 12, 700, "end"], [12, -8, "3/14–3/16", 9.5, 400, "end"]] },
          { id: "stn", kind: "station", x: 36, y: 352, name: "中央車站", short: "中央車站",
            lb: [[14, 5, "中央車站（Mercure 走 5 分）", 12, 700, "start"], [-22, 26, "機場：SKM [S2] [S3] 或 公車 [175]", 9.5, 400, "start"]] }
        ],
        edges: [
          { id: "w-polin", a: "polin", b: "old", style: "spur", walk: "走 23 分・1.6 公里", lx: 0, ly: 0, min: 23, km: "1.6 公里", cards: ["old"],
            sheet: { walk: "經 Miodowa 街。",
              note: "Miodowa 街也在封閉範圍，原本經過的公車 [111]、[180] 改道，建議走路。",
              nav: [{ t: "去 POLIN", q: "POLIN Museum Anielewicza 6 Warszawa", mode: "walking" }, { t: "去城堡廣場", q: "Plac Zamkowy, Warszawa", mode: "walking" }] } },
          { id: "w-old-pow", a: "old", b: "powisle", style: "line", walk: "走 26 分・1.9 公里", lx: -62, ly: 6, min: 26, km: "1.9 公里", cards: ["old", "powisle"],
            sheet: { walk: "從城堡廣場沿 Krakowskie Przedmieście、Nowy Świat 一路直走到戴高樂圓環，沿途就是王宮之路。",
              note: "這一段路從 2026 年 11 月 7 日起禁止汽車和公車通行（到另行通知為止），原本經過的公車 [116]、[128]、[175]、[180]、[503] 都改道，建議走路。",
              nav: [{ t: "去戴高樂圓環", q: "Rondo Charles'a de Gaulle'a, Warszawa", mode: "walking" }, { t: "去城堡廣場", q: "Plac Zamkowy, Warszawa", mode: "walking" }] } },
          { id: "w-pow-cen", a: "powisle", b: "centrum", style: "line", walk: "走 14 分・1 公里", lx: -10, ly: -22, min: 14, km: "1 公里", cards: ["powisle", "centrum"],
            sheet: { walk: "沿 Aleje Jerozolimskie，不用搭車。",
              go: { total: "約 9 分", steps: [["walk", "走到圓環旁的 Muzeum Narodowe 站", ""], ["tram", "電車 [7] [9] [22] [24] [25] 任一班，坐 2 站到 Centrum 站", "3～4 分"], ["walk", "走到科學文化宮", "4 分"]] },
              nav: [{ t: "去科學文化宮", q: "Pałac Kultury i Nauki, Warszawa", mode: "walking" }, { t: "去戴高樂圓環", q: "Rondo Charles'a de Gaulle'a, Warszawa", mode: "walking" }] } },
          { id: "w-pow-laz", a: "powisle", b: "lazienki", style: "line", walk: "走 32 分・2.4 公里", lx: 40, ly: 0, bus: "公車 [116] [180] 約 20 分", bx: -4, by: 22, min: 32, busMin: 20, km: "2.4 公里", cards: ["powisle", "lazienki"],
            sheet: { walk: "經 Aleja Tomasza Hopfera。",
              go: { total: "約 20 分", steps: [["walk", "走到新世界街上的 Foksal 站", "2 分"], ["bus", "公車 [116] 或 [180]，坐到 Łazienki Królewskie 站", "7～8 分"], ["walk", "穿過公園走到水上宮殿", "約 10 分"]] },
              warn: "公車 [116]、[180] 目前因王宮之路封閉改道，出發前用 Jakdojade 確認 Foksal 站還有停。",
              nav: [{ t: "去水上宮殿", q: "Pałac na Wyspie, Łazienki Królewskie, Warszawa", mode: "transit" }, { t: "去戴高樂圓環", q: "Rondo Charles'a de Gaulle'a, Warszawa", mode: "transit" }] } },
          { id: "w-mer-cen", a: "waw1", b: "centrum", style: "link", walk: "走 5 分", lx: -14, ly: 6, min: 5, km: "400 公尺", cards: ["centrum"],
            sheet: { walk: "經 Złota、Emilii Plater 街。",
              nav: [{ t: "去科學文化宮", q: "Pałac Kultury i Nauki, Warszawa", mode: "walking" }, { t: "回 Mercure", q: "Mercure Warszawa Centrum Złota 48/54 Warszawa", mode: "walking" }] } },
          { id: "w-cho-pow", a: "waw2", b: "powisle", style: "link", walk: "走 5 分", lx: 12, ly: -14, min: 5, km: "350 公尺", cards: ["powisle"],
            sheet: { walk: "沿 Smolna 街到戴高樂圓環。",
              nav: [{ t: "去戴高樂圓環", q: "Rondo Charles'a de Gaulle'a, Warszawa", mode: "walking" }, { t: "回 Chopin Boutique", q: "Chopin Boutique Smolna 14 Warszawa", mode: "walking" }] } },
          { id: "w-stn", a: "stn", b: "centrum", style: "stn" },
          { id: "w-mer-old", a: "waw1", b: "old", draw: false, min: 36, busMin: 20, km: "2.6 公里", cards: ["old"],
            sheet: { walk: "經 Senatorska 街。",
              go: { total: "約 20 分", steps: [["walk", "走到中央車站旁的 Dworzec Centralny 站（在 Al. Jana Pawła II 上）", "4 分"], ["bus", "公車 [160]，坐到 Stare Miasto 站（站在地下隧道裡）", "11～12 分"], ["walk", "搭手扶梯或走樓梯上去就是城堡廣場", "4 分"]] },
              back: { total: "約 24 分", steps: [["bus", "Stare Miasto 站搭公車 [160]，坐到 Dworzec Centralny 站", "14～15 分"], ["walk", "走回飯店", "5 分"]] },
              warn: "出發前用 Jakdojade 確認公車 [160] 照常行駛；[128]、[175] 目前改道，不要搭。",
              nav: [{ t: "去城堡廣場", q: "Plac Zamkowy, Warszawa", mode: "transit" }, { t: "回 Mercure", q: "Mercure Warszawa Centrum Złota 48/54 Warszawa", mode: "transit" }] } },
          { id: "w-cho-old", a: "waw2", b: "old", draw: false, min: 28, km: "2.1 公里", cards: ["old"],
            sheet: { walk: "沿 Nowy Świat、Krakowskie Przedmieście 一路直走。",
              note: "這一段路目前禁止公車通行，建議走路。",
              nav: [{ t: "去城堡廣場", q: "Plac Zamkowy, Warszawa", mode: "walking" }, { t: "回 Chopin Boutique", q: "Chopin Boutique Smolna 14 Warszawa", mode: "walking" }] } }
        ],
        notes: []
      },
      transit: [{ n: "市區 ZTM 票", d: "公車、電車、地鐵、SKM 通用，75 分鐘票 PLN 4.40（約 NT$37），用 Jakdojade app 或售票機買。" }, { n: "機場", d: "SKM [S2]（到 Warszawa Śródmieście）、[S3]（到華沙中央車站 Warszawa Centralna），或公車 [175]。" }], ref: ["waw1", "waw2"], mapCity: "Warszawa",
      intro: "二戰後依原貌重建的首都，老城列入世界遺產，適合慢慢走、看美術館、坐咖啡館。",
      tips: [
        { i: "shop", t: "週日超市大多不開", d: "Żabka 便利商店、藥局、麵包店、加油站例外，Żabka 多數開到 23:00。餐廳照常營業。" },
        { i: "museum", t: "週一多數博物館休館", d: "王宮、國家博物館、華沙博物館都休。兩人一起在華沙的是 3/14 週日和 3/15 週一，想一起看的展館排 3/14。" },
        { i: "food", t: "家常菜去牛奶吧", d: "老城廣場旁的餐廳偏貴、偏觀光。" },
        { i: "museum", t: "戰爭主題的博物館要有中文導覽", d: "POLIN 猶太歷史博物館有中文語音導覽。華沙起義博物館的語音導覽沒有中文（官網列的是英、法、德、西、義、希臘、斯洛伐克、烏克蘭 8 種）。" }
      ],
      areas: [
        { id: "powisle", name: "新世界街一帶", line: "走路就到新世界街和王宮之路；3/14～3/16 住的 Chopin Boutique 在這區。" },
        { id: "old", name: "王宮之路與老城", line: "戰後重建、列入世界遺產的老城和王宮。" },
        { id: "centrum", name: "市中心：科學文化宮、Marszałkowska", line: "蘇聯時期的地標和市中心商圈，平價餐廳和咖啡店多。2/26～2/28 住的 Mercure 在這區，中央車站附近。" },
        { id: "lazienki", name: "瓦津基公園", line: "王室夏宮和大公園，水上宮殿裡有國王的畫廊。" }
      ],
      pois: [
        { id: "stor", pri: "must", why: "手沖", when: ["day"], area: "powisle", type: "cafe", name: "STOR Cafe", local: "ul. Tamka 33", q: "STOR Cafe Tamka 33 Warszawa",
          line: "華沙最早的精品咖啡店之一，招牌是手沖。",
          hours: "平日 08:30–21:00，週末 09:30–21:00",
          tip: "華沙在地雜誌說，很多人覺得這是全波蘭最好的咖啡館。", lat: 52.2368, lng: 21.0228 },
        { id: "natmuseum", pri: "must", when: ["day"], area: "powisle", type: "sight", name: "國家博物館", local: "Muzeum Narodowe w Warszawie",
          line: "波蘭最大的美術館，有歐洲古典繪畫和波蘭歷史畫。", time: "2～3 小時",
          hours: "週二～週四、週六、週日 10:00–18:00，週五到 20:00", closed: [1], price: "PLN 30（約 NT$255）", free: "週二常設展免費",
          tip: "馬泰伊科的巨幅歷史畫《格倫瓦德之戰》在這裡。", lat: 52.2316, lng: 21.0249 },
        { id: "chopin", pri: "maybe", area: "powisle", type: "sight", name: "蕭邦博物館", local: "Muzeum Fryderyka Chopina",
          line: "全世界最多蕭邦手稿和遺物的博物館。", closed: [1], warn: "整修中", shut: true,
          hours: "2026 整年整修休館。館方目標是 2027 年 1 月重開，實際日期出發前確認。平常是週二～週日 11:00–18:00",
          tip: "重開後採整點入場。", lat: 52.2366, lng: 21.0216 },
        { id: "wedel", why: "熱巧克力", when: ["day", "eve"], area: "powisle", type: "cafe", name: "Wedel 巧克力咖啡館", local: "Pijalnia Czekolady E. Wedel, Szpitalna 8",
          line: "1894 年開的熱巧克力老店，波蘭的國民巧克力品牌。",
          hours: "週一～週六約 09:00–22:00，週日到 20:00 或 21:00（各網站略有出入）", lat: 52.2344, lng: 21.0125 },
        { id: "bristol", why: "百年老店", when: ["day"], area: "old", type: "cafe", name: "Cafe Bristol", local: "Krakowskie Przedmieście 42/44", q: "Cafe Bristol Warszawa",
          line: "1901 年開業的維也納風老咖啡館，在布里斯托飯店一樓。",
          hours: "每天 09:00–18:00（有的網站寫到 19:00）",
          tip: "招牌是維也納咖啡和奶油千層派（kremówka）。", lat: 52.2428, lng: 21.0153 },
        { id: "castle", pri: "must", when: ["day"], area: "old", type: "sight", name: "華沙王宮", local: "Zamek Królewski",
          line: "歷代國王的居所，有林布蘭的兩幅肖像，還有貝洛托畫的 23 幅華沙城景。", time: "2～3 小時",
          hours: "週二～週日 10:00–17:00，最後入場 16:00", closed: [1], price: "PLN 60（約 NT$510）", free: "週三免費（走特別路線，部分展廳不開）",
          tip: "旅人說重建得非常逼真，慢慢看可以待到三小時。", lat: 52.2479, lng: 21.0143 },
        { id: "oldsquare", pri: "must", when: ["day", "eve"], area: "old", type: "sight", name: "老城廣場與甕城", local: "Rynek Starego Miasta, Barbakan",
          line: "彩色山牆房屋圍成的廣場，中央是華沙美人魚像；往北走到紅磚甕城和新城。", time: "1 小時",
          hours: "戶外，隨時可去", lat: 52.2497, lng: 21.0122 },
        { id: "muzwarszawy", pri: "maybe", when: ["day"], area: "old", type: "sight", name: "華沙博物館", local: "Muzeum Warszawy",
          line: "在老城廣場邊的 11 棟老房子裡，講華沙的城市史。", time: "1.5 小時",
          hours: "週二～週五 9:00–17:00（週四到 19:00），週末 11:00–18:00", closed: [1], free: "週四免費",
          lat: 52.2502, lng: 21.0121 },
        { id: "concert", pri: "maybe", when: ["eve"], area: "old", type: "sight", name: "蕭邦音樂會", local: "Muzeum Archidiecezji Warszawskiej",
          line: "在總教區博物館聽蕭邦音樂會。",
          hours: "每天 18:30 開演", price: "PLN 45（約 NT$383）",
          tip: "蕭邦博物館整修期間的替代方案。這是 2026 年的資訊。", lat: 52.2486, lng: 21.0131 },
        { id: "zapiecek", why: "坐下來吃", when: ["day", "eve"], area: "old", type: "food", name: "Zapiecek 波蘭餃子", local: "Freta 18 等多家分店", q: "Zapiecek Freta 18 Warszawa",
          line: "連鎖波蘭餃子店，老城就有好幾家，台灣交換生最常推薦。",
          hours: "每天 11:00–23:00",
          tip: "台灣學生推薦點煎的，不要點水煮的；觀光客多時要排隊。人均約台幣 400～500（2023 年記錄）。",
          lat: 52.2522, lng: 21.0093 },
        { id: "barbakan", why: "平價快吃", when: ["day"], area: "old", type: "food", name: "Pod Barbakanem 牛奶吧", local: "Bar Mleczny Pod Barbakanem",
          line: "老城牆邊的牛奶吧，用很低的價格吃家常波蘭菜。",
          hours: "平日 08:00–16:00，週末 09:00–17:00",
          tip: "下午就關門，只能當早餐或午餐。牛奶吧是自己到櫃台點餐的平價食堂，吃完就走。", lat: 52.2509, lng: 21.0102 },
        { id: "holycross", pri: "must", when: ["day"], area: "old", type: "sight", name: "聖十字教堂", local: "Kościół Świętego Krzyża, Krakowskie Przedmieście 3", q: "Kościół Świętego Krzyża Krakowskie Przedmieście 3 Warszawa",
          line: "蕭邦的心臟封在教堂左側第二根柱子裡。就在王宮之路上，走路會經過。", time: "15 分鐘",
          hours: "免費。開放時間各來源不一（有的寫每天 6:00–20:00），遇到彌撒不方便參觀", lat: 52.2387, lng: 21.0168 },
        { id: "polin", pri: "maybe", when: ["day"], area: "old", type: "sight", name: "POLIN 波蘭猶太人歷史博物館", local: "Muzeum POLIN, Anielewicza 6", q: "POLIN Museum Anielewicza 6 Warszawa",
          line: "講波蘭猶太人一千年的歷史，華沙評價最高的博物館之一。在老城西北邊。", time: "2.5 小時",
          hours: "週一、週三～週五、週日 10:00–18:00，週六到 20:00；常設展最後入場是關門前 2 小時", closed: [2], price: "PLN 45（約 NT$383）", free: "週四免費",
          tip: "有中文語音導覽。週一有開，王宮和國家博物館休館的 3/15 可以來。", lat: 52.2494, lng: 20.9931 },
        { id: "pkin", pri: "must", when: ["day", "eve"], area: "centrum", type: "sight", name: "科學文化宮觀景台", local: "Pałac Kultury i Nauki，30 樓", q: "Pałac Kultury i Nauki Warszawa",
          line: "在 30 樓看整個華沙，也是少數週一有開的景點。", time: "1 小時",
          hours: "每天 10:00–20:00", price: "PLN 25（約 NT$213）",
          tip: "台灣交換生推薦離開華沙前上去道別；也有旅人覺得景色不錯但稱不上震撼。", lat: 52.2318, lng: 21.0060 },
        { id: "prasowy", why: "平價快吃", when: ["day"], area: "centrum", type: "food", name: "Bar Prasowy 牛奶吧", local: "Marszałkowska 10/16", q: "Bar Prasowy Marszałkowska 10/16 Warszawa",
          line: "1954 年開業的牛奶吧，裝潢翻新過，在地人和留學生最常推薦。",
          hours: "每天 08:00–20:00（有的網站寫週末 10:00–17:00）",
          tip: "平日中午 12～14 點人最多。", lat: 52.2189, lng: 21.0181 },
        { id: "koszyki", why: "美食街", when: ["day", "eve"], area: "centrum", type: "food", name: "Hala Koszyki 美食市場", local: "Koszykowa 63", q: "Hala Koszyki Warszawa",
          line: "老市場改建的美食街，約 30 個攤位，波蘭菜到亞洲菜都有。",
          hours: "每天 08:00–01:00；各攤位時間不同，中午過後選擇最多",
          tip: "兩人想吃的不一樣時很方便。", lat: 52.2226, lng: 21.0126 },
        { id: "ministerstwo", why: "手沖", when: ["day"], area: "centrum", type: "cafe", name: "Ministerstwo Kawy", local: "Marszałkowska 27/35", q: "Ministerstwo Kawy Warszawa",
          line: "華沙知名的精品咖啡店，用瑞典烘豆商 Koppi 的豆子。",
          hours: "平日 08:00–20:00，週末 09:00–20:00（2023 年資料）", lat: 52.2237, lng: 21.0161 },
        { id: "charlotte", why: "早餐", when: ["day"], area: "centrum", type: "cafe", name: "Charlotte", local: "Plac Zbawiciela", q: "Charlotte Plac Zbawiciela Warszawa",
          line: "法式麵包店咖啡館，在市中心最熱鬧的廣場上，適合吃早餐。",
          hours: "週一～週四 07:00–24:00，週五到 01:00，週六 09:00–01:00，週日 09:00–22:00", lat: 52.2196, lng: 21.0172 },
        { id: "palaceisle", pri: "must", when: ["day"], area: "lazienki", type: "sight", name: "水上宮殿", local: "Pałac na Wyspie",
          line: "湖中的古典主義宮殿，裡面是末代國王收藏的畫廊。", time: "公園加宮殿 1.5～2 小時",
          hours: "10～4 月：週二、週三 9:00–16:00，週四～週六 10:00–18:00，週日 10:00–16:00", closed: [1], price: "PLN 60（約 NT$510），含公園裡其他幾棟建築",
          free: "週五免費（只開一樓）；公園每天 6:00–21:00 免費",
          tip: "冬天最好下午 2 點前開始逛，天黑得早，地面也可能濕滑泥濘。", lat: 52.2150, lng: 21.0353 },
        { id: "chopinmon", pri: "maybe", when: ["day"], area: "lazienki", type: "sight", name: "蕭邦紀念碑", local: "Pomnik Fryderyka Chopina",
          line: "公園入口附近的蕭邦雕像。",
          hours: "戶外，公園每天 6:00–21:00",
          tip: "戶外蕭邦音樂會只在 5 月中到 9 月底的週末，3 月沒有。", lat: 52.2146, lng: 21.0270 }
      ]
    },
    osl: {
      name: "奧斯陸", region: "osl",
      routes: {
        h: 440,
        foot: "圖上的大眾運輸都是電車，2/28 地鐵停駛不影響；冬季假期電車班次可能比平常少。",
        water: [{ points: [[0, 402], [80, 392], [150, 406], [220, 396], [300, 388], [366, 394], [366, 440], [0, 440]], label: "奧斯陸峽灣（往南就是海）", lx: 183, ly: 428 }],
        nodes: [
          { id: "frogner", kind: "area", area: "frogner", x: 42, y: 52, r: 8, name: "維格蘭雕塑公園", short: "維格蘭公園",
            lb: [[0, -22, "維格蘭雕塑公園", 13, 700, "middle"]] },
          { id: "lokka", kind: "area", area: "lokka", x: 278, y: 58, name: "Grünerløkka", short: "Grünerløkka",
            lb: [[0, -24, "Grünerløkka", 14, 700, "middle"], [0, 30, "Tim Wendelboe・Mathallen", 10.5, 400, "middle"]] },
          { id: "osl", kind: "stay", stay: "osl", x: 184, y: 200, name: "Bob W", short: "Bob W",
            lb: [[-18, -14, "Bob W", 13, 700, "end"], [-18, 0, "2/28–3/2", 9.5, 400, "end"]] },
          { id: "sentrum", kind: "area", area: "sentrum", x: 60, y: 250, name: "市中心", short: "市中心",
            lb: [[0, 32, "市中心", 14, 700, "middle"], [0, 48, "國家博物館・市政廳", 10.5, 400, "middle"], [0, 63, "阿克斯胡斯城堡", 10.5, 400, "middle"]] },
          { id: "bjorvika", kind: "area", area: "bjorvika", x: 280, y: 330, name: "歌劇院一帶", short: "歌劇院一帶",
            lb: [[0, 32, "歌劇院一帶", 14, 700, "middle"], [0, 48, "歌劇院・孟克美術館・迪希曼", 10.5, 400, "middle"]] },
          { id: "stn", kind: "station", x: 288, y: 206, name: "Oslo S", short: "Oslo S",
            lb: [[12, 5, "Oslo S", 12, 700, "start"], [12, 20, "Bob W 走 6 分", 9.5, 400, "start"]] }
        ],
        edges: [
          { id: "o-vig", a: "frogner", b: "sentrum", style: "spur", walk: "走 48 分", lx: 0, ly: -14, bus: "電車 [12] 約 27 分", bx: 0, by: 24, min: 48, busMin: 27, km: "3.3 公里", cards: ["frogner", "sentrum"],
            sheet: { walk: "經 Frognerveien。",
              go: { total: "約 27 分", steps: [["walk", "走到國家博物館前的 Aker brygge 站", "2 分"], ["tram", "電車 [12]（往 Majorstuen），坐到 Vigelandsparken 站，下車就是正門", "14～15 分"], ["walk", "走進公園中央的雕塑區", "8～10 分"]] },
              back: { total: "約 29 分", steps: [["walk", "走回正門外的 Vigelandsparken 站", "8～10 分"], ["tram", "電車 [12]（往 Kjelsås），坐到 Aker brygge 站", "15～16 分"], ["walk", "走到國家博物館", "2 分"]] },
              nav: [{ t: "去維格蘭雕塑公園", q: "Vigelandsparken Oslo", mode: "transit" }, { t: "去國家博物館", q: "Nasjonalmuseet Oslo", mode: "transit" }] } },
          { id: "o-bob-lok", a: "osl", b: "lokka", style: "line", walk: "走 24 分・1.7 公里", lx: -34, ly: 0, bus: "電車 [11] [12] 約 15 分", bx: -8, by: 24, min: 24, busMin: 15, km: "1.7 公里", cards: ["lokka"],
            sheet: { walk: "經 Torggata、Markveien。",
              go: { total: "約 15 分", steps: [["walk", "走到 Dronningens gate 站", "2～3 分"], ["tram", "電車 [11] 或 [12]（往 Kjelsås），坐到 Olaf Ryes plass 站", "9～10 分"], ["walk", "走到 Tim Wendelboe", "2 分"]] },
              back: { total: "約 14 分", steps: [["walk", "走到 Olaf Ryes plass 站", "2 分"], ["tram", "電車 [11] 或 [12]（往 Majorstuen），坐到 Dronningens gate 站", "約 9 分"], ["walk", "走回住處", "2～3 分"]] },
              nav: [{ t: "去 Tim Wendelboe", q: "Tim Wendelboe Grüners gate 1 Oslo", mode: "transit" }, { t: "回 Bob W", q: "Kirkegata 30, Oslo", mode: "transit" }] } },
          { id: "o-bob-sen", a: "osl", b: "sentrum", style: "line", walk: "走 15 分・1.1 公里", lx: 6, ly: 22, min: 15, km: "1.1 公里", cards: ["sentrum"],
            sheet: { walk: "經 Tollbugata。",
              go: { total: "約 7 分", steps: [["walk", "走到 Dronningens gate 站", "2 分"], ["tram", "電車 [12]（往 Majorstuen），坐 2 站到 Aker brygge 站", "3 分"], ["walk", "下車就在國家博物館前", "2 分"]] },
              nav: [{ t: "去國家博物館", q: "Nasjonalmuseet Oslo", mode: "walking" }, { t: "回 Bob W", q: "Kirkegata 30, Oslo", mode: "walking" }] } },
          { id: "o-bob-bjo", a: "osl", b: "bjorvika", style: "line", walk: "走 11 分", lx: 38, ly: -8, min: 11, km: "850 公尺", cards: ["bjorvika"],
            sheet: { walk: "經 Prinsens gate，不用搭車。",
              nav: [{ t: "去歌劇院", q: "Operahuset Oslo", mode: "walking" }, { t: "回 Bob W", q: "Kirkegata 30, Oslo", mode: "walking" }] } },
          { id: "o-sen-bjo", a: "sentrum", b: "bjorvika", style: "line", walk: "走 24 分・1.7 公里", lx: 0, ly: 22, min: 24, km: "1.7 公里", cards: ["sentrum", "bjorvika"],
            sheet: { walk: "經 Tollbugata，建議走路。",
              nav: [{ t: "去歌劇院", q: "Operahuset Oslo", mode: "walking" }, { t: "去國家博物館", q: "Nasjonalmuseet Oslo", mode: "walking" }] } },
          { id: "o-stn", a: "stn", b: "osl", style: "stn" },
          { id: "o-lok-bjo", a: "lokka", b: "bjorvika", draw: false, min: 32, km: "2.3 公里", cards: ["lokka", "bjorvika"],
            sheet: { walk: "經 Markveien。",
              go: { total: "", steps: [["tram", "電車 [11] 或 [12]，坐到 Jernbanetorget 站（Oslo S 前）", ""], ["walk", "走到歌劇院", ""]] },
              nav: [{ t: "去歌劇院", q: "Operahuset Oslo", mode: "transit" }, { t: "去 Tim Wendelboe", q: "Tim Wendelboe Grüners gate 1 Oslo", mode: "transit" }] } }
        ],
        notes: []
      },
      transit: [{ n: "市區", d: "用 Ruter app 買票。" }, { n: "機場", d: "Vy 區域火車或機場快線 Flytoget，見 2/28、3/2 每日頁的「怎麼去」。" }, { n: "2/25～2/28 地鐵停駛", d: "電車照常（班次可能減少）。" }], ref: "osl", mapCity: "Oslo",
      intro: "挪威首都，現代建築、孟克和北歐精品咖啡，兩人會合的第一站。",
      tips: [
        { i: "shop", t: "2/28 週日大型超市不開", d: "只有 Joker、Bunnpris 和便利商店，營業時間較短。晚餐和隔天早餐先想好。" },
        { i: "museum", t: "3/1 週一國家博物館休館", d: "孟克美術館照常開。May 2/28 中午就到，可以當天下午去國家博物館（週日開到 17:00）。" },
        { i: "cup", t: "精品咖啡去 Grünerløkka", d: "Tim Wendelboe 和 Supreme Roastworks 走路幾分鐘就到。" }
      ],
      areas: [
        { id: "bjorvika", name: "歌劇院一帶：Bjørvika", line: "中央車站南邊的港區，歌劇院和孟克美術館比鄰。" },
        { id: "sentrum", name: "市中心：國家博物館、王宮", line: "卡爾約翰大街連接車站和王宮，國家博物館在港邊。" },
        { id: "lokka", name: "Grünerløkka 咖啡區", line: "河東岸的文青街區，精品咖啡店最密集。" },
        { id: "frogner", name: "維格蘭雕塑公園", line: "市區西北的大公園，兩百多座雕像，免費。" }
      ],
      pois: [
        { id: "opera", area: "bjorvika", type: "sight", pri: "must", when: ["day", "eve"], name: "奧斯陸歌劇院", local: "Operahuset",
          line: "白色大理石斜坡直接通到屋頂，走上去就能看港灣和城市，免費。", time: "1 小時",
          hours: "屋頂斜坡戶外，隨時可上；積雪結冰時可能封閉。大廳週一～週六 11:00–16:00、週日 12:00–16:00（2026 年資料）",
          tip: "冬天斜坡可能結冰濕滑，穿止滑的鞋。", lat: 59.9075, lng: 10.7531 },
        { id: "munch", area: "bjorvika", type: "sight", pri: "must", when: ["day", "eve"], name: "孟克美術館", local: "MUNCH",
          line: "收藏孟克作品最多的美術館，《吶喊》的其中一個版本一直有展出。", time: "2～3 小時",
          hours: "週一、二、日 10:00–18:00，週三到週六開到 21:00", price: "NOK 220（約 NT$781，2026 年 5 月）；週三 18:00 後免費",
          tip: "少數週一有開的大型美術館，適合排在 3/1。", lat: 59.9062, lng: 10.7556 },
        { id: "nasjonal", area: "sentrum", type: "sight", pri: "must", when: ["day"], name: "國家博物館", local: "Nasjonalmuseet",
          line: "北歐最大的美術館，從古典大師到孟克都有，也有一版《吶喊》。", time: "至少 2 小時",
          hours: "週二、三 10:00–20:00，週四到週日 10:00–17:00", closed: [1],
          tip: "頂樓有可以看峽灣的咖啡廳。", lat: 59.9115, lng: 10.7289 },
        { id: "akershus", area: "sentrum", type: "sight", pri: "maybe", when: ["day"], name: "阿克斯胡斯城堡", local: "Akershus festning",
          line: "峽灣邊的中世紀要塞，城牆上散步可以看港口，戶外區域免費。", time: "1 小時",
          hours: "園區每天 06:00–21:00，免費；10～4 月側門 18:00 就關，晚一點走正門", lat: 59.9070, lng: 10.7360 },
        { id: "fuglen", area: "sentrum", type: "cafe", why: "老店", when: ["day", "eve"], name: "Fuglen", local: "Universitetsgata 2",
          line: "1963 年開業的咖啡館，滿屋北歐中世紀家具，白天咖啡、晚上變酒吧。",
          hours: "週一、週二 07:30–20:00，週三、週四到 24:00，週五到 01:00，週六 09:00–01:00，週日 09:00–20:00",
          tip: "有旅人說這是整趟旅行喝過最好的濃縮咖啡。19:00 後不做義式咖啡，晚上是調酒吧。", lat: 59.9145, lng: 10.7350 },
        { id: "wendelboe", area: "lokka", type: "cafe", why: "手沖", when: ["day"], name: "Tim Wendelboe", local: "Grüners gate 1",
          line: "2004 年世界咖啡師冠軍開的店，北歐淺焙的代表，咖啡迷必朝聖。",
          hours: "平日 08:30–18:00，週末 11:00–17:00（2026 年資料）",
          tip: "只有 16 個座位、只賣咖啡。平日剛開門到 10 點比較不用排隊。", lat: 59.9233, lng: 10.7559 },
        { id: "supreme", area: "lokka", type: "cafe", why: "手沖", when: ["day"], name: "Supreme Roastworks", local: "Thorvald Meyers gate 18",
          line: "離 Tim Wendelboe 幾個路口，品質不相上下，氣氛比較熱鬧，在地常客多。",
          hours: "平日約 08:00–17:00，週末 10:00–17:00（各網站差一小時）", lat: 59.9228, lng: 10.7590 },
        { id: "vigeland", area: "frogner", type: "sight", pri: "maybe", when: ["day"], name: "維格蘭雕塑公園", local: "Vigelandsparken",
          line: "雕塑家維格蘭一人創作的兩百多座雕像，中央是人體疊成的巨石柱，免費。", time: "1～1.5 小時",
          hours: "戶外，隨時可去",
          tip: "冬天雪景裡的雕像別有味道，但天黑得早，要白天去。", lat: 59.9270, lng: 10.7008 },
        { id: "deichman", area: "bjorvika", type: "sight", pri: "maybe", when: ["day", "eve"], name: "迪希曼圖書館", local: "Deichman Bjørvika, Anne-Cath. Vestlys plass 1", q: "Deichman Bjørvika Oslo",
          line: "2020 年開幕的市立總圖書館，在中央車站和歌劇院中間，六層樓可以自由進去逛，免費。", time: "30～45 分鐘",
          hours: "平日 08:00–22:00，週末 10:00–18:00", lat: 59.9088, lng: 10.7522 },
        { id: "radhus", area: "sentrum", type: "sight", pri: "maybe", when: ["day"], name: "奧斯陸市政廳", local: "Oslo rådhus", q: "Oslo rådhus",
          line: "諾貝爾和平獎頒獎的地方，大廳四面是巨幅壁畫，免費。", time: "30 分鐘",
          hours: "每天 09:00–16:00，要過安檢", lat: 59.9118, lng: 10.7336 },
        { id: "mathallen", area: "lokka", type: "food", why: "美食街", when: ["day", "eve"], name: "Mathallen 美食市場", local: "Mathallen Oslo, Vulkan", q: "Mathallen Oslo",
          line: "Grünerløkka 旁的室內美食市場，海鮮、起司、各國小吃都有。",
          hours: "週二～週六 10:00–20:00，週日 11:00–18:00", closed: [1],
          tip: "3/1 週一沒開。2/28 週日開到 18:00。", lat: 59.9233, lng: 10.7517 },
        { id: "fiskeriet", area: "sentrum", type: "food", why: "坐下來吃", when: ["day", "eve"], name: "Fiskeriet Youngstorget", local: "Youngstorget 2B", q: "Fiskeriet Youngstorget Oslo",
          line: "魚店兼海鮮小館，招牌是奶油魚湯和炸魚薯條。",
          hours: "週一～週五 11:00–22:00，週六、週日 12:00–22:00",
          tip: "台灣旅人評價兩極：很多人推魚湯，也有人覺得偏鹹、有腥味。魚湯約 NOK 175（約 NT$621，2018 年的價格，現在應該更貴）。用餐時段常客滿。", lat: 59.9147, lng: 10.7498 }
      ]
    },
    tos: {
      name: "特羅姆瑟", region: "tos",
      routes: {
        h: 330,
        foot: "回程的公車和去程不同線，點下面區域裡的「隔壁」看去回怎麼搭。",
        water: [{ points: [[202, 0], [250, 0], [220, 330], [172, 330]], label: "Tromsøysundet 海峽", lx: 214, ly: 190, rotate: -84 }],
        nodes: [
          { id: "centre", kind: "area", area: "centre", x: 108, y: 74, name: "市中心（島上）", short: "市中心",
            lb: [[0, -24, "市中心（島上）", 14, 700, "middle"], [-6, 32, "大教堂・Storgata・港邊", 10.5, 400, "middle"], [-6, 47, "Polaria 在市中心南邊", 10.5, 400, "middle"]] },
          { id: "tromsdalen", kind: "area", area: "tromsdalen", x: 306, y: 132, name: "跨橋：北極大教堂與纜車", short: "跨橋",
            lb: [[0, -24, "跨橋", 14, 700, "middle"], [0, 30, "北極大教堂・纜車", 10.5, 400, "middle"]] },
          { id: "tos", kind: "stay", stay: "tos", x: 128, y: 232, name: "Sjøparken", short: "Sjøparken",
            lb: [[18, -2, "Sjøparken", 13, 700, "start"], [18, 13, "3/2–3/5", 9.5, 400, "start"]] },
          { id: "tel", kind: "spot", area: "centre", x: 40, y: 300, r: 8, name: "Telegrafbukta 海灘", short: "Telegrafbukta",
            lb: [[14, 5, "Telegrafbukta 海灘", 12, 700, "start"]] }
        ],
        edges: [
          { id: "t-cen-arc", a: "centre", b: "tromsdalen", style: "line", walk: "走 28 分・過橋", lx: 0, ly: -14, bus: "公車 [20] [24] [26] [28] 約 15 分", bx: 28, by: -26, min: 28, busMin: 15, km: "2 公里", cards: ["centre", "tromsdalen"],
            sheet: { walk: "走 Tromsø 橋過海峽。",
              go: { total: "約 15 分", steps: [["walk", "走到 Prostneset 或 Roald Amundsens plass 站", "4 分"], ["bus", "公車 [20] [24] [26] [28] 任一班過橋，坐到 Tromsdalen kirke 站", "7～8 分"], ["walk", "走到北極大教堂", "2 分"]] },
              nav: [{ t: "去北極大教堂", q: "Ishavskatedralen Tromsø", mode: "transit" }, { t: "去大教堂", q: "Tromsø domkirke", mode: "transit" }] } },
          { id: "t-home-cen", a: "tos", b: "centre", style: "line", walk: "走 26 分・1.9 公里", lx: -66, ly: -6, bus: "公車 [34] [40] 約 12 分", bx: 6, by: 24, min: 26, busMin: 12, km: "1.9 公里", cards: ["centre"],
            sheet: { walk: "沿海邊 Strandvegen 往北，一路平路。",
              go: { total: "約 12 分", steps: [["walk", "走到住處附近的公車站", "2～5 分"], ["bus", "公車 [34] 或 [40]（往市中心 Sentrum），坐到 Bankgata 或 Nerstranda 站", "約 6 分"], ["walk", "走到大教堂", "3 分"]] },
              back: { total: "約 10 分", steps: [["walk", "走到 Bankgata 或 Wi-To 站", "3 分"], ["bus", "公車 [40]（往 Tromsø museum）或 [33]，坐回住處附近", "約 5 分"], ["walk", "走回住處", "2 分"]] },
              fare: "單程 NOK 50（約 NT$178）；平日 9:00–14:00、17:00–01:00 離峰 NOK 30（約 NT$107）。用 Svipper app 或感應式信用卡，車上不收現金。",
              warn: "住處附近的站名各來源不一（Lanesbukta、Bjerkely、Solbakken），到了在 Google 地圖輸入住址查。",
              nav: [{ t: "去大教堂", q: "Tromsø domkirke", mode: "transit" }, { t: "回住處", q: "Strandvegen 114B, Tromsø", mode: "transit" }] } },
          { id: "t-home-tel", a: "tos", b: "tel", style: "line", walk: "走 17 分・1.2 公里", lx: -22, ly: -14, min: 17, km: "1.2 公里", cards: ["centre"], row: "Sjøparken → Telegrafbukta 海灘",
            sheet: { walk: "經 Kohtvegen。",
              go: { total: "約 10 分", steps: [["walk", "走到住處附近的公車站", ""], ["bus", "公車 [33] 往南坐到 Telegrafbukta 站，或 [40] 坐到終點 Tromsø Museum 站", "約 3 分"], ["walk", "走到海灘", "2～3 分"]] },
              back: { total: "約 7～10 分", steps: [["bus", "Telegrafbukta 站搭公車 [34]（往市中心方向），坐 2 站", "約 3 分"], ["walk", "走回住處", "2～3 分"]] },
              nav: [{ t: "去 Telegrafbukta", q: "Telegrafbukta Tromsø", mode: "walking" }, { t: "回住處", q: "Strandvegen 114B, Tromsø", mode: "walking" }] } },
          { id: "t-home-arc", a: "tos", b: "tromsdalen", draw: false, min: 53, busMin: 25, km: "3.8 公里", cards: ["tromsdalen"],
            sheet: { walk: "經 Strandvegen 和 Tromsø 橋。",
              go: { total: "約 25 分", steps: [["bus", "公車 [34] 或 [40]，坐到市中心 Wi-To 或 Prostneset 站", "約 6 分"], ["bus", "換公車 [20] [24] [26] [28] 任一班過橋，坐到 Tromsdalen kirke 站", "約 8 分"], ["walk", "走到北極大教堂", "2 分"]] },
              back: { total: "約 26 分", steps: [["bus", "Tromsdalen kirke 站搭公車 [20] [24] [26] [28]，坐到市中心", "約 8 分"], ["bus", "換公車 [40] 或 [33]，坐回住處附近", "5～6 分"], ["walk", "走回住處", "2～4 分"]] },
              nav: [{ t: "去北極大教堂", q: "Ishavskatedralen Tromsø", mode: "transit" }, { t: "回住處", q: "Strandvegen 114B, Tromsø", mode: "transit" }] } }
        ],
        notes: [[238, 232, "住處 → 北極大教堂："], [238, 247, "搭車約 25 分，要轉車"]]
      },
      transit: [{ n: "市區公車", d: "用 Svipper app 或感應式信用卡買票，車上不收現金。單程 NOK 50（約 NT$178），平日 9:00–14:00、17:00–01:00 離峰 NOK 30（約 NT$107）。住處最近的站各來源寫 Lanesbukta、Bjerkely 或 Solbakken，到了用 Google 地圖查；搭到市中心約 12 分鐘，走路到大教堂約 26 分鐘。" }, { n: "公車 [33] [34]", d: "住處樓下的 [33]、[34] 是同一條環狀線的兩個方向：[34] 往北進市中心，[33] 從市中心往南回住處，再往南是 Telegrafbukta、Sydspissen。" }, { n: "機場公車 [40] [42]", d: "停機場和 Polaria，到市中心約 15～20 分鐘。機場站牌在航廈旁停車場樓梯下面。大行李空間不多，司機可以拒載。" }, { n: "機場巴士 Airport Express", d: "大人單程 NOK 125（約 NT$444）、來回 NOK 200（約 NT$710），只能刷卡。市區最南停 Polaria，到不了住處門口。" }, { n: "計程車", d: "Tromsø Taxi 03011、Din Taxi 02045。機場到市中心約 NOK 250～410（約 NT$888～1,456），可刷卡。" }], ref: "tos", mapCity: "Tromsø",
      intro: "北極圈裡生活機能最好的城市，市中心在島上，走路就能逛完。",
      tips: [
        { i: "sun", t: "白天短，戶外行程排中午前後", d: "晚上留給極光團。" },
        { i: "aurora", t: "市區光害大", d: "極光大爆發時在橋上或纜車山頂也看得到，但效果不如跟團到郊外。" },
        { i: "car", t: "哈士奇營地在郊外的克瓦洛亞島（Kvaløya）", d: "例如 Tromsø Wilderness Centre，推薦選自己駕駛雪橇。" },
        { i: "cup", t: "Risø 週日公休", d: "其他小店營業時間也常變動。" },
        { i: "museum", t: "纜車＋北極大教堂套票不划算", d: "大教堂常因婚禮、喪禮不開放，纜車強風會停駛。" },
        { i: "clock", t: "3 月看不到鯨魚", d: "賞鯨季是 11～1 月。" }
      ],
      areas: [
        { id: "centre", name: "市中心（島上）", line: "港邊、Storgata 和大教堂一帶，咖啡店、博物館都在走路範圍。" },
        { id: "tromsdalen", name: "跨橋：北極大教堂與纜車", line: "過跨海大橋到對岸，可以走路過橋或搭公車。" }
      ],
      pois: [
        { id: "polaria", area: "centre", type: "sight", pri: "maybe", when: ["day"], name: "Polaria 北極水族館", local: "Polaria",
          line: "像傾倒冰塊的建築，主角是海豹，每天有固定的餵食和訓練時段。", time: "1～2 小時",
          hours: "每天 10:00–17:00；海豹餵食 10:30、12:30、15:30",
          tip: "2025 年擴建完成。評價兩極，有人覺得館小、票價偏高；海豹訓練普遍好評。", lat: 69.6427, lng: 18.9476 },
        { id: "polarmuseum", area: "centre", type: "sight", pri: "maybe", when: ["day"], name: "極地博物館", local: "Polarmuseet",
          line: "19 世紀木造倉庫裡，講阿蒙森等極地探險家和早期北極狩獵。", time: "1 小時",
          hours: "冬季每天 11:00–17:00", lat: 69.6517, lng: 18.9606 },
        { id: "domkirke", area: "centre", type: "sight", pri: "maybe", when: ["day", "eve"], name: "特羅姆瑟大教堂", local: "Tromsø domkirke",
          line: "市中心的新哥德式木造教堂，雪地裡很上相。",
          hours: "內部只在週二、週五 12:00–16:00 開放，免費",
          tip: "3/2 是週二，下午可以進去。", lat: 69.6489, lng: 18.9555 },
        { id: "riso", area: "centre", type: "cafe", why: "手沖", when: ["day"], name: "Risø 咖啡", local: "Strandgata 32",
          line: "旅人和咖啡迷公認特羅姆瑟最好的咖啡，肉桂捲也很有名。",
          hours: "週一～週四 08:00–16:00，週五 08:00–17:00，週六 09:00–17:00", closed: [0],
          tip: "肉桂捲常常中午前就賣完。這趟在特羅姆瑟的三天都是 16:00 關門。", lat: 69.6491, lng: 18.9575 },
        { id: "kaffebonna", area: "centre", type: "cafe", why: "在地老店", when: ["day"], name: "Kaffebønna", local: "Stortorget 3", q: "Kaffebønna Stortorget 3 Tromsø",
          line: "在地老牌咖啡店，自家烘焙的麵包甜點多，招牌是卡士達椰子麵包 skolebrød。",
          hours: "平日 07:30–18:00，週六 09:00–18:00，週日 10:00–18:00", lat: 69.6516, lng: 18.9589, approx: true },
        { id: "raketten", area: "centre", type: "food", why: "邊走邊吃", when: ["day", "eve"], name: "Raketten 熱狗亭", local: "Raketten Bar & Pølse, Storgata 94B",
          line: "港邊的小圓亭，招牌是馴鹿肉熱狗，配熱紅酒。",
          hours: "冬季每天約 11:00–21:00（有的網站寫 12:00 開）", lat: 69.6493, lng: 18.9566 },
        { id: "tosbib", area: "centre", type: "sight", pri: "maybe", when: ["day"], name: "特羅姆瑟圖書館", local: "Tromsø bibliotek, Grønnegata 94", q: "Tromsø bibliotek Grønnegata 94",
          line: "弧形屋頂配整面玻璃的市立圖書館，屋頂原本是電影院的。免費，適合天氣不好時進去坐。", time: "20～45 分鐘",
          hours: "週一～週四 09:00–19:00，週五 09:00–16:00，週六 11:00–15:30", lat: 69.6507, lng: 18.9546 },
        { id: "telegrafbukta", area: "centre", type: "sight", pri: "maybe", when: ["day", "night"], name: "Telegrafbukta 海灘", local: "Telegrafbukta", q: "Telegrafbukta Tromsø",
          line: "島南端的海灘，光害比市中心少，是不出城看極光的地點。在住處更南邊。",
          tip: "公車 [33]（從市中心往南的方向）有 Telegrafbukta 站。", lat: 69.6321, lng: 18.9066 },
        { id: "dragoy", area: "centre", type: "food", why: "坐下來吃", when: ["day"], name: "Dragøy 魚市小館", local: "Dragøy, Kystens Mathus, Stortorget 1", q: "Dragøy Kystens Mathus Tromsø",
          line: "港邊魚市場裡的午餐店，現點現做的魚和海鮮，價位中等。",
          hours: "週一～週五 10:00–17:00，週六 11:00–17:00", closed: [0],
          tip: "只做白天，不收訂位。", lat: 69.6514, lng: 18.9600, approx: true },
        { id: "fiskekompaniet", area: "centre", type: "food", why: "想吃一頓好的", when: ["day", "eve"], name: "Fiskekompaniet", local: "Killengreens gate 6", q: "Fiskekompaniet Killengreens gate 6 Tromsø",
          line: "特羅姆瑟最有名的海鮮餐廳，在港邊，台灣和香港旅人幾乎都會提到。",
          hours: "午餐 11:30–14:00，晚餐 17:00–22:00", closed: [0],
          tip: "每人約 NOK 600～1,000 以上（約 NT$2,130～3,550），要先訂位。", lat: 69.6514, lng: 18.9600, approx: true },
        { id: "cathedral", area: "tromsdalen", type: "sight", pri: "must", when: ["day", "eve"], name: "北極大教堂", local: "Ishavskatedralen",
          line: "1965 年的白色三角形教堂，背面有整面彩繪玻璃。", time: "1 小時",
          hours: "每週不同，多半下午才開（約 13:00–17:00），官網每週更新", price: "NOK 90（約 NT$320）",
          tip: "常因婚禮、喪禮或音樂會不開放內部，看外觀就很值得。從市中心搭公車 [20] [24] [26] [28]，或走過大橋約 28 分鐘。", lat: 69.6481, lng: 18.9876 },
        { id: "fjellheisen", area: "tromsdalen", type: "sight", pri: "maybe", when: ["day", "eve"], name: "特羅姆瑟纜車", local: "Fjellheisen", warn: "施工中",
          line: "上 421 公尺的觀景台，看整個市區、跨海大橋和峽灣。", time: "1～2 小時",
          hours: "每天 09:00–24:00，強風停駛",
          price: "來回票各來源不一：NOK 495（約 NT$1,757，2026 年 8 月）到 NOK 645（約 NT$2,290，2026 年 10 月），買票前看官網",
          tip: "山上山下兩站從 2025 年 7 月起施工，山頂的戶外觀景平台封閉、只有臨時咖啡店。冬天傍晚下山排隊可能超過 1 小時。天氣好再上去；搭公車 [26] 到山下站。", lat: 69.6406, lng: 18.9965 }
      ]
    },
    lof: {
      name: "羅弗敦", region: "lof",
      mapCity: "Lofoten",
      /* E10 示意圖：投影 x = 14 + (經度 − 12.9) × 84，y = 16 + (68.62 − 緯度) × 210 */
      e10: {
        road: [["Å", 67.879, 12.983], ["Reine", 67.932, 13.089], ["Flakstad", 68.05, 13.30], ["Leknes", 68.147, 13.611], ["Borg", 68.243, 13.785],
               ["Gimsøy 橋", 68.30, 14.05], ["Svolvær", 68.234, 14.568], ["Fiskebøl", 68.41, 14.79], ["Gullesfjord", 68.53, 16.05], ["EVE 機場", 68.49, 16.68]],
        spurs: [["Svolvær", "Laukvik", 68.387, 14.412], ["Gimsøy 橋", "Lofoten Links", 68.3404, 14.1285], ["Svolvær", "Henningsvær", 68.155, 14.204], ["Reine", "Sakrisøy", 67.9409, 13.1111]],
        stays: [{ n: 1, stay: "lof1", lat: 68.3404, lng: 14.1285, t: "Lofoten Links 3/5" }, { n: 2, stay: "lof2", lat: 67.9409, lng: 13.1111, t: "Sakrisøy 3/6–3/8" }, { n: 3, stay: "lof3", lat: 68.387, lng: 14.412, t: "Laukvik 3/8–3/10" }],
        towns: [["Å", 67.879, 12.983], ["Leknes", 68.147, 13.611], ["Svolvær", 68.234, 14.568], ["Henningsvær", 68.155, 14.204], ["Uttakleiv", 68.2096, 13.5016]],
        supply: [["Svolvær", "超市・加油"], ["Leknes", "超市・加油"], ["Reine", "超市・加油"], ["Laukvik", "超市"]],
        drives: [["3/5", "EVE 機場 → ① Lofoten Links", "約 205～210 公里，好路況約 3 小時"], ["3/6", "① → ② Sakrisøy", "約 103 公里，好路況約 1 小時 45 分"], ["3/8", "② → ③ Laukvik", "約 154 公里，好路況約 2.5 小時"], ["3/10", "③ Laukvik → EVE 機場", "約 167 公里，2.5～3 小時"]],
        drivesNote: "都是不停車、好路況的時間。下雪要多抓 1 小時以上。"
      },
      drive: [
        { t: "取車時要確認", items: ["輪胎是冬季胎或釘胎。", "油車還是電動車（Yulun 沒開過電動車）。", "車上有沒有 AutoPASS：過路費之後從租車費扣，羅弗敦本身過路費很少。", "道路救援電話（在租車合約上，記到租車備忘）。", "繞車一圈拍照存證，記下油的種類。"] },
        { t: "每天開車前", items: ["路況看 175（Statens vegvesen，vegvesen.no，也可撥 175），天氣看 yr.no 的風和降雪。", "Gimsøystraumen 橋、Raftsundet 橋強風時會封橋，可能封幾小時，沒有替代道路。", "建議油量低於一半就加（推論）。"] },
        { t: "補給點", items: ["斯沃爾韋爾（Svolvær）：Kiwi、Rema 1000、Coop Mega；Alti 購物中心裡的 Bunnpris 週日 10:00～23:00 有開。", "Leknes：Coop Extra、Rema 1000、Bunnpris 等，Bunnpris 週日也開。", "Laukvik：Coop Marked，週一～五 10:00～18:00、週六 10:00～15:00，週日不開。", "加油站在 Svolvær、Leknes、雷訥（Reine），多為自助、只收卡，部分無人站要用有 PIN 碼的卡。", "營業時間是舊資料，出發前和前一天都要再查。"] },
        { t: "路上要注意", items: ["Leknes 以西路比較窄、會車困難。", "冬天路肩不清雪，不要隨便路邊停車拍照，到有標示的停車場。", "豪克蘭（Haukland）、烏塔克萊夫（Uttakleiv）海灘停車要付費。烏塔克萊夫用車牌辨識自動收費（YouPark），小客車每 3 小時 NOK 60（約 NT$213），開進村子就算。", "天黑早，日照時間看每日頁。"] },
        { t: "出事時", items: ["租車道路救援看合約，保險資料在雲端硬碟。"], tel: [["112", "警察"], ["113", "救護"], ["110", "消防"]] },
        { t: "3/10 還車", items: ["08:00 出發、中午前還車。", "前一晚查路況和天氣。", "3/9 在斯沃爾韋爾（Svolvær）加滿油。", "暴風雪時的備案是改住機場附近。"] }
      ],
      intro: "雪山直接從海裡拔起，一條 E10 公路串起整排島。",
      tips: [
        { i: "shop", t: "3/7 週日大型超市不開", d: "偏遠地區週日營業的店更少。3/6 週六先把 3/7 的食物買好。" },
        { i: "car", t: "暴風雪就不要開車", d: "下大雪、強風時待在住處。E10 曾因風暴封路，橋也會因強風封閉，沒有替代道路。只是下雨或陰天，可以去室內：洛弗特維京博物館（Borg）、卡伯爾沃格（Kabelvåg）的水族館，開放時間前一天查。亨寧斯韋爾的羅弗敦美術館冬天只開週三～週六。" },
        { i: "car", t: "看雲量開車追晴天", d: "雲量預報哪邊晴就往哪邊開。" },
        { i: "clock", t: "冬天店家常不照公告開門", d: "有旅人說不一定照公告時間營業，想去的店前一天先查。" },
        { i: "aurora", t: "北側海灘看極光", d: "Vik、烏塔克萊夫（Uttakleiv）、Gimsøy 北岸、Skagsanden 面向北方、光害少。各住處怎麼看，見極光頁。" },
        { i: "food", t: "部分餐廳冬天休息，超市選擇也少", d: "晚餐多半要自己煮，經過大鎮時先採買。" },
        { i: "clock", t: "雷訥布林根（Reinebringen）步道冬天很危險", d: "不建議爬。" }
      ],
      areas: [
        { id: "west", name: "西側：雷訥一帶", line: "雷訥、哈姆諾伊、薩克里索伊、Å，羅弗敦最經典的畫面。" },
        { id: "mid", name: "中段：海灘", line: "白天是雪山配海灘，晚上是看極光的地方。" },
        { id: "east", name: "東側：亨寧斯韋爾", line: "建在小島群上的漁村，冬天正值鱈魚季。" }
      ],
      pois: [
        { id: "reine", area: "west", type: "sight", pri: "must", when: ["day", "eve", "night"], name: "雷訥", local: "Reine",
          line: "紅白漁屋配尖山倒影，羅弗敦最經典的明信片畫面。", lat: 67.9320, lng: 13.0890 },
        { id: "hamnoy", area: "west", type: "sight", pri: "must", when: ["day", "eve"], name: "哈姆諾伊橋", local: "Hamnøy",
          line: "橋上看紅色漁屋配背後的尖山，攝影師最愛的機位。", lat: 67.9470, lng: 13.1330 },
        { id: "anita", area: "west", type: "food", why: "外帶", when: ["day"], name: "Anita's 海鮮", local: "Anita's Sjømat, Sakrisøy",
          line: "黃色小村裡的海鮮小店，招牌是鱈魚漢堡，也賣在地起司、巧克力和魚乾。",
          hours: "冬季大約 12:00–16:00，依月份變動，前一天看店家 Facebook",
          tip: "就在 Sakrisøy 住處旁邊。", lat: 67.9420, lng: 13.1150 },
        { id: "skagsanden", area: "west", type: "sight", pri: "maybe", when: ["day", "night"], name: "Skagsanden 海灘", local: "Skagsanden, Flakstad",
          line: "面向西北的大沙灘，從雷訥（Reine）往東約 25 分鐘，是離雷訥最近的開闊極光點。", lat: 68.1046, lng: 13.2899 },
        { id: "nusfjord", area: "west", type: "sight", pri: "maybe", when: ["day"], name: "努斯峽灣漁村", local: "Nusfjord",
          line: "保存最完整的老漁村之一，從 E10 岔進去的小峽灣裡。",
          price: "入村費 NOK 100～150（約 NT$355～533），各來源不一",
          tip: "3 月也收入村費（有旅人 3 月去照樣要付）。評價兩極，有人覺得是觀光陷阱。住在村裡、在村裡餐廳用餐可免入村費。", lat: 68.0353, lng: 13.3475 },
        { id: "haukland", area: "mid", type: "sight", pri: "must", when: ["day"], name: "豪克蘭海灘", local: "Haukland strand",
          line: "白沙配雪山，白天最好看。面向西南，晚上要極光很強才看得到。", lat: 68.1994, lng: 13.5321 },
        { id: "uttakleiv", area: "mid", type: "sight", pri: "must", when: ["night"], name: "烏塔克萊夫海灘", local: "Uttakleiv",
          line: "西北到北方開闊、光害少，極光倒映在潮池裡。東邊被山擋住。", lat: 68.2096, lng: 13.5016 },
        { id: "vik", area: "mid", type: "sight", pri: "maybe", when: ["night"], name: "Vik 海灘", local: "Vik strand",
          line: "在豪克蘭海灘旁邊，對北方最開闊，等極光先來這裡。",
          tip: "從 Leknes 開往豪克蘭會先經過 Vik，再往前是豪克蘭海灘和往烏塔克萊夫的隧道。路邊停車位很少。", lat: 68.1931, lng: 13.5403 },
        { id: "lofotr", area: "mid", type: "sight", pri: "maybe", when: ["day"], name: "洛弗特維京博物館", local: "Lofotr Vikingmuseum, Borg",
          line: "重建的 83 公尺維京酋長長屋，就在 E10 旁，室內為主，天氣不好也能去。",
          hours: "2026 年 11～12 月只開週三、週六 11:00～17:00；2027 年冬季時間出發前查。",
          tip: "3/6 週六會經過。和羅弗敦美術館都只有這天對得上，兩個都去會很趕，先去美術館。", lat: 68.2440, lng: 13.7566 },
        { id: "football", area: "east", type: "sight", pri: "maybe", when: ["day"], name: "亨寧斯韋爾足球場", local: "Henningsvær stadion",
          line: "建在岩石小島上的球場，經典照片是空拍，站在地面看不太出來。", lat: 68.1530, lng: 14.2070 },
        { id: "gallery", area: "east", type: "sight", pri: "must", when: ["day"], name: "羅弗敦美術館", local: "Galleri Lofoten, Misværveien 18", q: "Galleri Lofoten Misværveien 18 Henningsvær",
          line: "收藏挪威最大的北挪威 19 世紀繪畫之一，還有雕塑和當代作品。",
          hours: "2026 年：2/22～3/31 只開週三～週六 11:00–16:00。2027 年的時間出發前查", closed: [0, 1, 2],
          price: "NOK 110（約 NT$391）", warn: "這趟只有 3/6 能去",
          tip: "照 2026 年的時間，在羅弗敦的五天只有 3/5（五）和 3/6（六）有開，3/5 到的時候已經關門。", lat: 68.1550, lng: 14.2040, approx: true },
        { id: "lysstoperi", area: "east", type: "cafe", why: "氣氛", when: ["day"], name: "Henningsvær 蠟燭坊咖啡", local: "Henningsvær Lysstøperi og Cafe", q: "Henningsvær Lysstøperi og Cafe",
          line: "村子中心的小咖啡館，兼賣手工蠟燭和手作，熱巧克力很受歡迎。",
          hours: "冬季各來源不一，多半 10:00 或 12:00 開、16:00 關，可能有公休日，前一天查", lat: 68.1550, lng: 14.2050, approx: true }
      ]
    },
    bgo: {
      name: "卑爾根", region: "bgo",
      transit: [{ n: "公車、輕軌", d: "用 Skyss 票，上車前在 app 或售票機買。" }, { n: "輕軌 [1] 到機場", d: "大人 NOK 51（約 NT$181）。火車站旁的 Nonneseter 站 2026 年關閉，改在 Bystasjonen（巴士總站）上下車。" }], ref: "bgo", mapCity: "Bergen", tour: "2027-03-11",
      intro: "峽灣入口的港口城市，彩色木屋街是世界遺產。",
      tips: [
        { i: "rain", t: "雨具要帶", d: "挪威最常下雨的城市之一。" }
      ],
      areas: [
        { id: "bryggen", name: "布呂根與港邊", line: "彩色木屋、魚市場和纜車站都在港邊走路範圍。" }
      ],
      pois: [
        { id: "bryggen", area: "bryggen", type: "sight", pri: "must", when: ["day", "eve"], name: "布呂根", local: "Bryggen",
          line: "漢薩同盟時期的木造商館，世界遺產；鑽進後巷看木板走道和老倉庫。", time: "1 小時", lat: 60.3975, lng: 5.3245 },
        { id: "floyen", area: "bryggen", type: "sight", pri: "must", when: ["day", "eve"], name: "弗洛伊恩纜車", local: "Fløibanen",
          line: "上山看整個港灣，晚上夜景很美。", time: "1～1.5 小時",
          hours: "平日 07:30–24:00，週末 08:00–24:00（2026 年資料）", price: "來回 NOK 150（約 NT$533，2027 年 1～3 月票價）", lat: 60.3964, lng: 5.3285 },
        { id: "fishmarket", area: "bryggen", type: "food", why: "坐下來吃", when: ["day"], name: "魚市場", local: "Fisketorget",
          line: "冬天只有室內的玻璃屋市場有開，戶外攤位 5～9 月才有。價格比市區餐廳貴約兩成，吃氣氛。",
          hours: "室內市場週一～週六 09:00–21:30，週日 10:00–21:30（2025 年遊記引用官網）", lat: 60.3948, lng: 5.3253 },
        { id: "kaffemisjonen", area: "bryggen", type: "cafe", why: "手沖", when: ["day"], name: "Kaffemisjonen", local: "Øvre Korskirkeallmenning 5",
          line: "纜車站旁的精品咖啡店，在地人常推薦的卑爾根最好咖啡之一。",
          hours: "平日 08:00–18:00，週末 10:00–18:00", lat: 60.3956, lng: 5.3270 },
        { id: "dlk", area: "bryggen", type: "cafe", why: "老店", when: ["day"], name: "Det Lille Kaffekompaniet", local: "Nedre Fjellsmauet 2",
          line: "1996 年開業，卑爾根最小也最老的精品咖啡店，在纜車站附近的小巷裡。",
          hours: "每天約 10:00–18:00（有的網站寫 11:00 開）", lat: 60.3963, lng: 5.3281 },
        { id: "hagelin", area: "bryggen", type: "food", why: "平價快吃", when: ["day"], name: "Søstrene Hagelin 魚湯店", local: "Strandkaien 3", q: "Søstrene Hagelin Strandkaien 3 Bergen",
          line: "1929 年開的魚店，賣魚湯和魚餅，離魚市場走路 1 分鐘，在地人也會來外帶。",
          hours: "週一～週四 10:00–19:00，週五 10:00–18:00，週六 10:00–17:00", closed: [0],
          tip: "3/10 到卑爾根已經傍晚，19:00 關門可能趕不上；3/12 週五上午 10:00 開，去機場前可以吃。", lat: 60.3952, lng: 5.3259, approx: true },
        { id: "trekroneren", area: "bryggen", type: "food", why: "邊走邊吃", when: ["day", "eve"], name: "Trekroneren 熱狗亭", local: "Kong Oscars gate 1", q: "Trekroneren Kong Oscars gate 1 Bergen",
          line: "卑爾根最有名的熱狗攤，招牌是馴鹿肉熱狗，配越橘醬和炸洋蔥。",
          hours: "11:00 開到深夜",
          tip: "馴鹿熱狗約 NOK 90（約 NT$320，2026 年遊記）。", lat: 60.3952, lng: 5.3259, approx: true }
      ]
    },
    gdn: {
      name: "格但斯克", region: "gdn",
      transit: [{ n: "公車", d: "用 ZTM 票（Jakdojade app 或售票機），SKM、PKM 火車另外買票。" }, { n: "機場", d: "公車 [210]。" }, { n: "3/13 一日遊", d: "去馬爾堡（Malbork）或索波特（Sopot）搭火車。" }], ref: "gdn", mapCity: "Gdańsk",
      intro: "波羅的海邊的漢薩港口古城，冬天安靜又有氣氛。",
      tips: [
        { i: "food", t: "長街一帶的牛奶吧和餃子店", d: "便宜好吃，在地人和學生常去，午餐和傍晚要排隊。" },
        { i: "museum", t: "聖母聖殿鐘樓 3 月不開", d: "鐘樓只在 3/25～11/30 開放。" },
        { i: "museum", t: "3/12、3/13 博物館和城堡都有開", d: "3/12 週五、3/13 週六。" },
        { i: "rain", t: "海邊冬天風很大", d: "去索波特棧橋要穿防風外套。" },
        { i: "museum", t: "團結工會中心沒有中文導覽", d: "歐洲團結工會中心（ECS）評價很高，門票含語音導覽，但沒有中文（有英文），展場文字是波蘭文和英文。離老城走路約 20 分鐘。" }
      ],
      areas: [
        { id: "main", name: "主城區：長街與長市場", line: "從金門到綠門的皇家之路，彩色山牆房屋和海神噴泉。" },
        { id: "river", name: "河畔與穀倉島", line: "莫特瓦瓦河沿岸的老倉庫和中世紀起重機。" },
        { id: "trips", name: "一日遊（3/13）：馬爾堡、索波特", line: "搭火車就到，3/13 二選一。" }
      ],
      pois: [
        { id: "longmarket", area: "main", type: "sight", pri: "must", when: ["day", "eve"], name: "長街與長市場", local: "Długa, Długi Targ",
          line: "兩旁是彩色山牆商人房屋，中間是海神噴泉，格但斯克最經典的畫面。", time: "1 小時", lat: 54.3486, lng: 18.6533 },
        { id: "amber", area: "main", type: "sight", pri: "maybe", when: ["day"], name: "琥珀博物館", local: "Muzeum Bursztynu, Wielkie Młyny 16", q: "Muzeum Bursztynu Wielkie Młyny 16 Gdańsk",
          line: "在中世紀的大磨坊裡，看包著昆蟲的琥珀和琥珀工藝。台灣旅人常推薦。", time: "1.5～2 小時",
          hours: "週二～週日 10:00–18:00，週一 12:00–18:00（各網站寫法不一，去之前查）", price: "PLN 37（約 NT$315）", free: "週一免費",
          tip: "2021 年搬到現在的大磨坊（Wielki Młyn）。舊文章寫的監獄塔是舊址。", lat: 54.3540, lng: 18.6500 },
        { id: "mariacki", area: "main", type: "sight", pri: "must", when: ["day"], name: "聖母聖殿", local: "Bazylika Mariacka",
          line: "世界最大的磚造教堂之一，內部高大明亮。", time: "1 小時",
          hours: "週一～週六 08:30–17:30，週日 11:00–12:00、13:00–17:30（2025 年遊記），教堂免費",
          tip: "教堂裡有 1464 年的天文鐘。鐘樓只在 3/25～11/30 開放，這趟上不去。", lat: 54.3497, lng: 18.6532 },
        { id: "mariacka", area: "main", type: "sight", pri: "maybe", when: ["day", "eve"], name: "瑪麗亞街", local: "ulica Mariacka",
          line: "石階門廊和琥珀小店林立的窄街，從聖母聖殿走到河邊。", lat: 54.3502, lng: 18.6550 },
        { id: "gdnmuseum", area: "main", type: "sight", pri: "must", when: ["day"], name: "國家博物館（格但斯克）", local: "Muzeum Narodowe w Gdańsku, Oddział Sztuki Dawnej, Toruńska 1", warn: "先確認畫回來了沒",
          line: "收藏漢斯・梅姆林的祭壇畫《最後的審判》，喜歡古典繪畫一定要去。",
          hours: "週二～週日 10:00–17:00，最後入場 16:30", closed: [1], price: "PLN 25（約 NT$213）", free: "週二免費",
          tip: "梅姆林的《最後的審判》2025 年 2 月起送去檢修，不在展場。館方說 2026 年底重新展出，也有資料寫到 2027 年 3 月。出發前確認，畫還沒回來就不用特地去。", lat: 54.3436, lng: 18.6560 },
        { id: "neptun", area: "main", type: "food", why: "平價快吃", when: ["day"], name: "Neptun 牛奶吧", local: "Bar Mleczny Neptun, Długa 33/34",
          line: "長街上最有名的牛奶吧，兩道菜不到 25 茲羅提（約台幣 213）。",
          hours: "淡季平日 07:30–19:00，週末 10:00–18:00",
          tip: "14:00 前去選擇最多，之後份量會變少。有網站寫只收現金，帶一點茲羅提。", lat: 54.3487, lng: 18.6510 },
        { id: "mandu", area: "main", type: "food", why: "坐下來吃", when: ["day", "eve"], name: "Mandu 波蘭餃子", local: "Pierogarnia Mandu, Elżbietańska 4/8",
          line: "常被選為格但斯克最好吃的餃子店，在火車站附近。",
          hours: "每天 11:00–22:00", lat: 54.3555, lng: 18.6458 },
        { id: "pyra", area: "main", type: "food", why: "平價快吃", when: ["day", "eve"], name: "Pyra Bar 烤馬鈴薯", local: "Pyra Bar",
          line: "各式配料的烤馬鈴薯，一盤不到 40 茲羅提（約台幣 340）。",
          hours: "週日～週四 11:00–21:00，週五、週六到 22:00", lat: 54.3505, lng: 18.6518 },
        { id: "drukarnia", area: "main", type: "cafe", why: "氣氛", when: ["day", "eve"], name: "Drukarnia Café", local: "Mariacka 36",
          line: "瑪麗亞街上的咖啡館，旅遊作家常推薦。",
          hours: "每天 09:00–21:00，週五、週六到 22:00", lat: 54.3501, lng: 18.6560 },
        { id: "zuraw", area: "river", type: "sight", pri: "must", when: ["day", "eve"], name: "中世紀起重機", local: "Żuraw",
          line: "河邊的木造起重機塔樓，格但斯克的地標。",
          hours: "外觀隨時可看。內部展覽 4～10 月才開，冬天不開（只有一個來源）", lat: 54.3507, lng: 18.6574 },
        { id: "stagiewna", area: "river", type: "food", why: "平價快吃", when: ["day"], name: "Stągiewna 牛奶吧", local: "Bar Mleczny Stągiewna, Stągiewna 15",
          line: "老城和穀倉島之間的牛奶吧，一整餐不到 25 茲羅提。",
          hours: "09:00–18:00", lat: 54.3475, lng: 18.6585 },
        { id: "malborkpoi", area: "trips", type: "sight", pri: "must", when: ["day"], name: "馬爾堡城堡", local: "Zamek w Malborku",
          line: "世界最大的紅磚城堡，條頓騎士團總部，世界遺產。從格但斯克搭火車約 25～35 分鐘，大約每小時一班。", time: "完整路線約 3.5 小時，加來回車程要大半天",
          hours: "冬季（10 月～4 月底）週二～週日 09:00–15:00，最晚約 13:00 入場；週一只開外圍路線", closed: [1], price: "完整路線 PLN 80（約 NT$680），含語音導覽",
          tip: "語音導覽沒有中文，有英文。城堡沒有暖氣，室內也冷，穿暖。3/13 是週六，有開。", lat: 54.0397, lng: 19.0277 },
        { id: "sopotpoi", area: "trips", type: "sight", pri: "maybe", when: ["day"], name: "索波特海上棧橋", local: "Molo w Sopocie",
          line: "歐洲最長的木造海上棧橋，從格但斯克搭通勤火車約 20～30 分鐘。", time: "半天",
          hours: "全天開放。4/10～9/30 才收門票，3 月免費（2026 年的規定）",
          tip: "冬天的波羅的海是灰藍色的，適合排半天輕鬆逛。", lat: 54.4466, lng: 18.5700 }
      ]
    }
  },
  cityOrder: ["waw", "osl", "tos", "lof", "bgo", "gdn"],

  /* 地址卡：複製貼到 Bolt、Uber 或地圖；name 是要複製、給人看的當地名稱 */
  addresses: {
    "waw-air": { name: "Lotnisko Chopina", sub: "華沙蕭邦機場", city: "Warszawa", code: "WAW" },
    "waw-st":  { name: "Warszawa Centralna", sub: "華沙中央車站", city: "Warszawa" },
    "gdn-air": { name: "Port Lotniczy Gdańsk", sub: "格但斯克機場", city: "Gdańsk", code: "GDN" },
    "gdn-st":  { name: "Gdańsk Główny", sub: "格但斯克火車總站", city: "Gdańsk" },
    "osl-air": { name: "Oslo lufthavn Gardermoen", sub: "奧斯陸機場", city: "", code: "OSL" },
    "tos-air": { name: "Tromsø lufthavn", sub: "特羅姆瑟機場", city: "", code: "TOS" },
    "eve-air": { name: "Harstad/Narvik lufthavn Evenes", sub: "哈爾斯塔/納爾維克機場，取車、還車", city: "", code: "EVE" },
    "bgo-air": { name: "Bergen lufthavn Flesland", sub: "卑爾根機場", city: "", code: "BGO" },
    "osl-st":  { name: "Oslo sentralstasjon", sub: "奧斯陸中央車站（Oslo S）", city: "Oslo" },
    "bgo-st":  { name: "Bergen stasjon", sub: "卑爾根火車站", city: "Bergen" }
  },

  /* 極光分頁 */
  aurora: {
    newMoon: "2027-03-08",
    stats: [
      { n: "17", u: "%", t: "特羅姆瑟：一個晚上天空夠乾淨的機率" },
      { n: "33", u: "%", t: "羅弗敦：開車往晴的一側追，一個晚上天空夠乾淨的機率" },
      { n: "79", u: "%", t: "8 晚（特羅姆瑟 3 晚、羅弗敦 5 晚）至少 1 晚天空夠乾淨" }
    ],
    facts: [
      "新月約在 3/8，剛好在羅弗敦。月亮越暗，淡的極光越看得清楚。",
      "「天空夠乾淨」是指天黑後連續 2 小時雲量在 30% 以下。數字來自 2015～2025 年 3 月的雲量資料，只代表天氣晴不晴，不代表當晚有沒有極光。",
      "羅弗敦有車，可以往晴的一側開，機率比只待在一個地方高。8 晚平均約有 2 晚天空夠乾淨。",
      "肉眼看到的極光多半是灰綠色的淡光帶，照片會比肉眼亮很多。"
    ],
    tour: [
      "只報一次，沒看到再報。挑雲量預報最晴的那晚。",
      "選小團、評價高、可改期的業者，報名前問清楚會不會跨境到芬蘭或瑞典追晴天。",
      "候選 Flexitour：2018 年跟這家看到極光，官網每人約 1,590 挪威克朗起（約台幣 5,600），出發 24 小時前取消可退 95%。"
    ],
    lofoten: [
      "有車就是追光工具：看雲量往晴的一側移動。",
      "北側海灘地平線開闊、光害少：Vik、烏塔克萊夫（Uttakleiv）、Gimsøy 北岸、Skagsanden。",
      "村子裡的路燈會讓照片過曝，找村子邊緣暗一點的地方。"
    ],
    steps: [
      { t: "今晚哪裡晴？", d: "最重要的一步。看低雲和中雲，高雲影響比較小。羅弗敦往雲少的方向開；特羅姆瑟用來決定要不要報團。",
        tools: [["Yr", "https://www.yr.no", "逐小時雲量，分低、中、高雲"], ["Windy", "https://www.windy.com", "大範圍雲圖"]] },
      { t: "極光活不活躍？", d: "北挪威不用看 Kp。看 Bz：接近 0 或轉成負值，大約 30 分鐘內有機會出現。",
        tools: [["Norlys", "https://norlys.live", "非營利、沒有廣告；iPhone app 要 iOS 18.2 以上"]] },
      { t: "現在有人看到了嗎？", d: "有人貼照片就代表出來了。",
        tools: [["Facebook 極光通報社團", "", "在 Facebook 搜尋特羅姆瑟、羅弗敦的極光通報社團，名稱出發前確認"], ["Hello Aurora app", "", "看附近使用者的回報"]] }
    ],
    /* 羅弗敦觀測點，依住處分組：stay 住處 id（日期和導航從住處來）；沒有 stay 的是哪裡都能開過去的組。
       items 是字串，或 { d 說明, poi 羅弗敦地點 id（用它的座標導航）, q 沒有座標時導航用的搜尋名稱 } */
    spotsNote: "通常 20:00～21:00 之後才出現；到午夜還沒有，多半就不會有了。",
    spots: [
      { stay: "lof1", t: "Lofoten Links Lodges（Gimsøy 的 Hov）", sum: "出門就看，不用開車。",
        items: ["小屋朝北，北邊沒有山、幾乎沒有光害。", "走到 Hov 海灘約 200 公尺。", "背景沒有山，照片比較單調。", "只住這一晚，陰天就等下一站。"] },
      { stay: "lof2", t: "Sakrisøy Rorbuer", sum: "先在小屋外面看；想要開闊的北方，開 25 分鐘到 Skagsanden 海灘。",
        items: ["這一帶很暗，有住客在小屋外就看到極光。",
          { d: "哈姆諾伊（Hamnøy）橋：極光出現時擠滿腳架，往 Toppøy 走幾百公尺比較有空間。", poi: "hamnoy" },
          "新月前後，對岸的山會被村子的燈照成橘色，只影響照片，不影響肉眼看。",
          { d: "Skagsanden 海灘（Flakstad）：面向西北，往北都開闊。從雷訥（Reine）往東 26 公里、好路況約 25 分鐘。", poi: "skagsanden" }] },
      { stay: "lof3", t: "Laukvik Suites", sum: "出門就看，往西北是開闊海面。",
        items: ["白天先在住處附近找一個沒有路燈的位置。", "3/8 是新月，整趟最暗的一夜。"] },
      { t: "中段海灘", sub: "從哪個住處都可以開過來追晴天", sum: "先到 Vik 海灘等，極光移動再換到隔壁海灘。",
        items: [{ d: "Vik 海灘：對北方最開闊，適合先在這裡等。從 Leknes 開往豪克蘭會先經過這裡，路邊停車位很少。", poi: "vik" },
          { d: "烏塔克萊夫海灘（Uttakleiv）：西北到北方開闊，東邊被山擋住。", poi: "uttakleiv" },
          { d: "豪克蘭海灘（Haukland）：面向西南，北邊和東邊是山，極光很強、到頭頂時才適合。", poi: "haukland" }] }
    ],
    coming: []
  },

  /* 行前清單：勾選狀態只存在自己的手機 */
  checklist: [
    { id: "car", text: "訂 EVE 機場租車", sub: "3/5 12:15 落地後取、3/10 中午前還，四驅、自排、雪胎；留意是不是電動車" },
    { id: "nutshell", text: "訂挪威縮影", sub: "3/11 卑爾根來回；買之前先看取消規定" },
    { id: "wf863-seat", text: "選 3/5 Widerøe WF863 座位", sub: "Widerøe 的 My trips，Smart 可免費選一般座位" },
    { id: "ek-may", text: "跟 May 確認阿聯酋機票開票了沒" },
    { id: "wizz-bp", due: "2027-02-10", dueApprox: true, text: "確認 Wizz 登機證有沒有出來", sub: "WIZZ PLUS 有自動報到，兩個訂位代號都要看" },
    { id: "wizz-check", text: "確認 Wizz 訂單是 WIZZ PLUS", sub: "兩人各一個 Wizz 訂位代號（見 Trip.com 行程單），兩個都要登入 Wizz app 查" },
    { id: "lof-arrival", text: "告知 Lofoten Links Lodges 預計抵達時間", sub: "確認單要求事先告知；3/5 12:15 落地，取車後開過去" },
    { id: "laukvik-arrival", text: "告知 Laukvik Suites 預計抵達時間", sub: "確認單要求事先告知；3/8 從 Sakrisøy 開過去" },
    { id: "bobw-call", due: "2027-02-14", text: "打電話給 Bob W 安排入住", sub: "抵達前 14 天；同時完成線上登記（要上傳護照照片），問 May 2/28 約 14:00 能不能寄放行李" },
    { id: "sakrisoy-checkin", text: "向 Sakrisøy Rorbuer 確認冬季入住時間、怎麼拿鑰匙" },
    { id: "pkp", due: "2027-02-12", dueApprox: true, text: "買格但斯克 → 華沙火車票", sub: "出發前約 30 天開賣" },
    { id: "entry", due: "2027-01-25", text: "查入境規定最新公告", sub: "歐盟 EES、ETIAS 上路時程" },
    { id: "hours", due: "2027-01-25", text: "確認景點營業時間", sub: "出發前一個月。重點：蕭邦博物館有沒有重開、格但斯克《最後的審判》回來了沒、羅弗敦美術館和洛弗特維京博物館 2027 年冬季哪幾天開、特羅姆瑟纜車票價。" },
    { id: "offline", due: "2027-02-11", text: "手冊加到主畫面、測試離線", sub: "出發前兩週。備忘要在主畫面打開的手冊裡打，清除瀏覽器資料會一起消失" },
    { id: "sjoparken-bath", due: "2027-02-25", text: "跟 May 確認能不能接受 Sjøparken 和房東共用浴室", sub: "不行的話 2/25 15:00（當地時間）前取消" },
    { id: "chopin-reply", text: "等 Chopin Boutique 回信，確認飯店收到訂單" },
    { id: "mercure-charge", text: "確認 Mercure 只扣款一次", sub: "帳單出現兩筆的話，拿取消信找 Agoda" },
    { id: "ruter-strike", due: "2027-02-18", text: "用 Ruter app 查 2/28 地鐵停駛範圍" },
    { id: "drive-offline", due: "2027-02-11", text: "雲端硬碟裡的電子機票、住宿確認單設成「離線可用」" },
    { id: "gmaps-offline", due: "2027-02-18", text: "下載 Google 地圖離線地圖（羅弗敦、特羅姆瑟）" },
    { id: "aurora-app", due: "2027-02-18", text: "裝好極光 App 並開通知", sub: "見極光頁「今晚判斷」" },
    { id: "mofa-reg", due: "2027-02-18", text: "外交部出國登錄", sub: "外交部領事事務局網站" },
    { id: "sos-phones", text: "查好保險公司、發卡銀行的海外緊急電話", sub: "之後加進資料頁「緊急」" },
    /* 旅途中 */
    { id: "bobw-mail", day: "2027-02-26", until: "2027-02-28", text: "收 Bob W 的入住說明和門禁密碼 email", sub: "抵達前 72 小時內寄來，收到後填進 Bob W 的備忘" },
    { id: "hans-info", day: "2027-02-27", until: "2027-02-28", text: "收 Hans-Erik 的入住資訊", sub: "他說入住前 2～3 天傳，收到後填進 Sjøparken 的備忘" },
    { id: "aurora-book", day: "2027-03-02", text: "看雲量預報報極光團", sub: "第一次排 3/2 或 3/3 晚上；報名時問回程能不能送到 Strandvegen 114B" },
    { id: "aurora-again", day: "2027-03-04", text: "前兩晚沒看到極光的話再報一次" },
    { id: "taxi-0305", day: "2027-03-04", eve: true, text: "預約 3/5 早上的計程車", sub: "Tromsø Taxi 03011、Din Taxi 02045" },
    { id: "bag-0305", day: "2027-03-04", eve: true, text: "確認登機箱厚度在 20 公分內，證件放隨身小包" },
    { id: "food-0307", day: "2027-03-06", text: "採買 3/7 週日的食物" },
    { id: "road-0310", day: "2027-03-09", eve: true, text: "查 175 路況和 yr 天氣，決定 3/10 出發時間" },
    { id: "fuel-0310", day: "2027-03-09", eve: true, text: "在斯沃爾韋爾（Svolvær）加滿油" },
    { id: "train-0314", day: "2027-03-13", eve: true, text: "確認 3/14 火車時間，11:00 前退房" },
    { id: "waw-175", day: "2027-03-15", text: "查明天去機場的公車 [175] 在 Foksal 站有沒有停", sub: "王宮之路 2026 年 11 月起禁止公車通行，[175] 改道；用 Jakdojade 查" }
  ],
  /* 資料頁「緊急」：tel 撥號 [號碼, 說明]，不寫卡號 */
  sos: [
    { t: "當地緊急電話", rows: [
      { n: "挪威", tel: [["112", "警察"], ["113", "救護"], ["110", "消防"]] },
      { n: "波蘭", tel: [["112", "緊急電話"]] } ] },
    { t: "駐外館處", rows: [
      { n: "駐瑞典代表處（兼理挪威）", d: "Sveavägen 168, Stockholm", tel: [["+46-70-675 5089", "緊急（非急難重大事件請勿撥打）"], ["+46-8-728 85 13", "辦公"]] },
      { n: "駐波蘭代表處", d: "Emilii Plater 53 30 樓, Warszawa", tel: [["+48-668-027-574", "緊急（非急難請勿撥打）"], ["+48-22-213-0060", "辦公"]] },
      { n: "外交部旅外國人急難救助專線", tel: [["+886-800-085-095", "急難救助"]] } ] },
    { t: "挪威路況", rows: [ { n: "Statens vegvesen 路況", tel: [["175", "路況"]] } ] },
    { t: "保險、信用卡", rows: [
      { n: "保險", d: "保單在雲端硬碟；保險公司緊急電話待補。" },
      { n: "信用卡掛失", d: "發卡銀行海外緊急電話待補。" } ] },
    { t: "護照遺失", rows: [ { n: "先報警拿報案證明，再聯絡駐外館處補發", d: "一般流程，出發前到外交部領事事務局網站確認。" } ] }
  ]
};
