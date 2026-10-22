/* 北境冬旅｜手冊資料
   改行程只要改這個檔案，index.html 不用動。
   status：booked 已訂、pending 待訂、self May 自訂
   who：Y 只有 Yulun、M 只有 May，不寫代表兩人一起
   訂位代號、確認號不要寫進來（網頁是公開的）。 */

window.TRIP = {
  updated: "2026-10-22",
  start: "2027-02-25",
  end: "2027-03-17",
  departures: { Y: "2027-02-25", M: "2027-02-27" },
  people: { Y: "Yulun", M: "May" },

  regions: {
    tw:  { name: "台灣",     color: "ink" },
    waw: { name: "華沙",     color: "brick" },
    osl: { name: "奧斯陸",   color: "fjord" },
    tos: { name: "特羅姆瑟", color: "aurora" },
    lof: { name: "羅弗敦",   color: "aurora" },
    bgo: { name: "卑爾根",   color: "fjord" },
    gdn: { name: "格但斯克", color: "brick" },
    sky: { name: "回程",     color: "ink" }
  },

  route: [
    { name: "華沙", nights: "2 晚，Yulun 先行", solo: true },
    { name: "奧斯陸", nights: "2 晚，會合" },
    { name: "特羅姆瑟", nights: "3 晚", polar: true },
    { name: "羅弗敦", nights: "4 晚", polar: true },
    { name: "卑爾根", nights: "3 晚" },
    { name: "格但斯克", nights: "2 晚" },
    { name: "華沙", nights: "2 晚" }
  ],

  stays: [
    { id: "waw1", who: "Y", area: "華沙", name: "Motel One Warsaw-Chopin", from: "2027-02-26", nights: 2,
      address: "ul. Tamka 38, 00-355 Warszawa", status: "booked", note: "房價不含早餐，現場付款" },
    { id: "osl", area: "奧斯陸", name: "", from: "2027-02-28", nights: 2, status: "pending" },
    { id: "tos", area: "特羅姆瑟", name: "", from: "2027-03-02", nights: 3, status: "pending" },
    { id: "lof1", area: "雷訥一帶", name: "", from: "2027-03-05", nights: 2, status: "pending", note: "找有廚房的住處" },
    { id: "lof2", area: "亨寧斯韋爾或斯沃爾韋爾一帶", name: "", from: "2027-03-07", nights: 2, status: "pending", note: "找有廚房的住處" },
    { id: "bgo", area: "卑爾根", name: "", from: "2027-03-09", nights: 3, status: "pending" },
    { id: "gdn", area: "格但斯克", name: "", from: "2027-03-12", nights: 2, status: "pending" },
    { id: "waw2", area: "華沙", name: "", from: "2027-03-14", nights: 2, status: "pending" }
  ],

  days: [
    { date: "2027-02-25", region: "tw",
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          bag: "託運 25 公斤，手提 7 公斤", status: "booked",
          price: "來回 NT$27,236（含稅）" }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場"] },

    { date: "2027-02-26", region: "waw", places: ["warsaw"],
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK179",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "07:50",
          to: "華沙 WAW", toNote: "A 航廈", arr: "11:30",
          bag: "託運 25 公斤，手提 7 公斤", status: "booked" },
        { who: "Y", t: "taxi", text: "Bolt 到旅館" }
      ],
      plan: ["Yulun 下午輕鬆走走，調時差"] },

    { date: "2027-02-27", region: "waw", places: ["warsaw"],
      plan: ["Yulun 華沙市區一日"],
      legs: [
        { who: "M", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          status: "self", price: "參考價 NT$19,592（台新優惠價），原價 NT$21,342" }
      ] },

    { date: "2027-02-28", region: "osl", places: ["oslo"],
      legs: [
        { who: "M", t: "flight", carrier: "阿聯酋", no: "EK159",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "",
          to: "奧斯陸 OSL", arr: "12:10", status: "self", depNote: "杜拜起飛時間待確認" },
        { who: "Y", t: "taxi", text: "Bolt 到華沙機場" },
        { who: "Y", t: "flight", carrier: "挪威航空", no: "DY1019",
          from: "華沙 WAW", dep: "14:25", to: "奧斯陸 OSL", arr: "16:20",
          bag: "託運 1 件 23 公斤；兩件手提合計 10 公斤", status: "booked", price: "待補" }
      ],
      notes: ["兩人都降落奧斯陸機場（Gardermoen），May 早到約 4 小時。在機場等，或先進市區 check-in，待決定"] },

    { date: "2027-03-01", region: "osl", places: ["oslo"],
      plan: ["市區一日：歌劇院屋頂、精品咖啡（Tim Wendelboe、Fuglen）"] },

    { date: "2027-03-02", region: "tos", places: ["tromso"],
      legs: [
        { t: "flight", carrier: "挪威航空", no: "",
          from: "奧斯陸 OSL", dep: "10:30", to: "特羅姆瑟 TOS", arr: "12:30",
          bag: "LowFare+，含 23 公斤託運", status: "pending",
          price: "USD 137.30（約 NT$4,435），價格待更新" }
      ] },

    { date: "2027-03-03", region: "tos", places: ["tromso"],
      plan: ["看雲量預報，挑最晴的一晚報極光團",
             "選小團、評價高、可改期的業者，報名前問清楚會不會跨境追晴天。Flexitour 是候選（出發 24 小時前取消可退 95%）"] },

    { date: "2027-03-04", region: "tos", places: ["tromso"],
      plan: ["哈士奇雪橇", "極光團沒看到的話再報一次"] },

    { date: "2027-03-05", region: "lof", places: ["lofoten"],
      legs: [
        { t: "flight", carrier: "Widerøe", no: "",
          from: "特羅姆瑟 TOS", dep: "10:55", to: "埃弗內斯 EVE", arr: "12:15", via: "安德內斯",
          bag: "Smart：1 件託運＋登機箱", status: "pending",
          price: "749 挪威克朗（約 NT$2,502）" },
        { t: "car", text: "埃弗內斯機場取車（四驅、自排、雪胎），往西開到雷訥一帶", status: "pending" }
      ] },

    { date: "2027-03-06", region: "lof", places: ["lofoten"],
      plan: ["西側一日：雷訥、哈姆諾伊、薩克里索伊、Å"] },

    { date: "2027-03-07", region: "lof", places: ["lofoten"],
      legs: [
        { t: "car", text: "往東移動，沿途可停烏塔克萊夫、豪克蘭海灘" }
      ] },

    { date: "2027-03-08", region: "lof", places: ["lofoten"],
      plan: ["東側一日：亨寧斯韋爾漁村"],
      notes: ["新月，整趟最暗的一夜"] },

    { date: "2027-03-09", region: "bgo", places: ["bergen"],
      legs: [
        { t: "car", text: "開回埃弗內斯機場還車" },
        { t: "flight", carrier: "Widerøe", no: "",
          from: "埃弗內斯 EVE", dep: "13:55", to: "卑爾根 BGO", arr: "16:40", via: "特隆赫姆",
          bag: "Smart：1 件託運＋登機箱", status: "pending",
          price: "1,599 挪威克朗（約 NT$5,341）" }
      ] },

    { date: "2027-03-10", region: "bgo", places: ["nutshell"],
      legs: [
        { t: "tour", text: "挪威縮影一日來回", dep: "08:29", arr: "18:17", status: "pending",
          price: "兩人 4,976 挪威克朗（每人約 NT$8,310）" }
      ],
      notes: ["冬天遊船可能改航線，詳細時刻和備案見地點介紹"] },

    { date: "2027-03-11", region: "bgo", places: ["bergen"],
      plan: ["卑爾根市區：布呂根、弗洛伊恩纜車、魚市場"],
      notes: ["挪威縮影如果停駛，改在這天走"] },

    { date: "2027-03-12", region: "gdn", places: ["gdansk"],
      legs: [
        { t: "flight", carrier: "Wizz Air", no: "",
          from: "卑爾根 BGO", dep: "13:40", to: "格但斯克 GDN", arr: "15:25",
          bag: "WIZZ Go：託運 20 公斤", status: "pending",
          price: "1,006 挪威克朗（約 NT$3,361）" }
      ],
      plan: ["傍晚逛老城長街、河畔"] },

    { date: "2027-03-13", region: "gdn", places: ["malbork", "sopot"],
      plan: ["馬爾堡城堡，或索波特海上棧橋"] },

    { date: "2027-03-14", region: "waw", places: ["warsaw"],
      legs: [
        { t: "train", text: "波蘭國鐵，格但斯克到華沙，約 2.5～3 小時", status: "pending",
          price: "約 19～32 英鎊，出發前約 30 天開賣" }
      ],
      notes: ["週日，大部分商店公休，只有餐廳和少數便利商店營業"] },

    { date: "2027-03-15", region: "waw", places: ["warsaw"],
      plan: ["老城與王宮、瓦津基公園；有剛好的表演再看"] },

    { date: "2027-03-16", region: "sky",
      legs: [
        { t: "flight", carrier: "阿聯酋", no: "EK180",
          from: "華沙 WAW", fromNote: "A 航廈", dep: "13:40",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "22:55",
          bag: "託運 25 公斤，手提 7 公斤", status: "booked", statusText: "Yulun 已訂，May 自訂",
          price: "Yulun 含在來回票裡；May 參考價 NT$13,520（台新優惠價），原價 NT$14,020" }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場"] },

    { date: "2027-03-17", region: "sky",
      legs: [
        { t: "flight", carrier: "阿聯酋", no: "EK366",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "03:40",
          to: "台北 TPE", toNote: "第二航廈", arr: "15:35",
          status: "booked", statusText: "Yulun 已訂，May 自訂" }
      ] }
  ],

  /* 內容區塊：h 小標、p 段落、list 清單、quote 引言、note 提醒、sub 子項目、stops 依序停靠 */
  places: [
    { id: "oslo", name: "奧斯陸", region: "osl", tier: "worth",
      line: "挪威首都，現代建築、孟克和北歐精品咖啡。兩人會合的第一站。",
      blocks: [
        { list: [
          "<b>歌劇院</b>：可以直接走上傾斜的屋頂看港灣，免費",
          "<b>孟克美術館</b>：收藏《吶喊》，每週三晚上 18～21 點免費，要提早預約",
          "<b>維格蘭雕塑公園</b>：兩百多座雕像，免費",
          "<b>精品咖啡</b>：Tim Wendelboe、Fuglen 等北歐咖啡代表店" ] },
        { p: "Time Out 曾把奧斯陸評為最佳北歐城市小旅行第一名；也有作者說它不像哥本哈根那麼漂亮。這次住 2 晚，3/1 整天逛市區和喝咖啡。" }
      ] },

    { id: "tromso", name: "特羅姆瑟", region: "tos", tier: "must", polar: true,
      line: "北極圈裡生活機能最好的城市，極光團最成熟。",
      blocks: [
        { h: "是什麼", p: "挪威北部最大的城市，位在北極圈內約 350 公里的小島上，被稱為「北極門戶」。市中心走路就能逛完，餐廳、博物館、飯店都很完整。" },
        { h: "有什麼", list: [
          "<b>極光團</b>：好的導遊會看雲量開到內陸，甚至越過邊境到芬蘭追晴天。2018 年就是跟 Flexitour 看到極光的，這家現在仍由同一位導遊經營",
          "<b>狗拉雪橇</b>：營地在郊外的克瓦洛亞島，例如 Tromsø Wilderness Centre，有超過 300 隻狗，推薦選自己駕駛",
          "<b>纜車</b>：上 421 公尺的觀景台，天氣好時看得到約 70 公里外的林根阿爾卑斯山",
          "<b>北極大教堂</b>：三角形的白色教堂，是城市地標" ] },
        { h: "旅人怎麼說", quote: "很貴、極光不穩定、市中心比想像中小，但不代表不值得去。如果期待的是 IG 上隨時都有的極光，很可能會失望。" },
        { p: "2025 年機場旅客量增加約 40%，冬天晚上觀光巴士塞滿港邊。" },
        { note: "極光團品質落差很大，要選小團、評價高、可彈性改期的業者。3 月看不到鯨魚，賞鯨季是 11～1 月。纜車＋北極大教堂套票不划算：大教堂常因婚喪禮不開放，纜車強風會停駛。" }
      ] },

    { id: "lofoten", name: "羅弗敦群島", region: "lof", tier: "must", polar: true,
      line: "雪山直接從海裡拔起，山腳是紅色漁屋。挪威冬天風景的最高峰。",
      blocks: [
        { h: "是什麼", p: "挪威西北外海的一串群島，一條 E10 公路由東到西把所有島串起來。2～3 月白天變長，光線最漂亮。" },
        { h: "會去哪裡", p: "先西後東：從埃弗內斯取車後直接往西，前 2 晚住雷訥一帶，後 2 晚住亨寧斯韋爾或斯沃爾韋爾一帶，最後開回埃弗內斯還車。" },
        { sub: "西側：哈姆諾伊、薩克里索伊、雷訥、Å", p: "整趟的精華。哈姆諾伊是紅色漁屋配尖山；過橋的薩克里索伊整村是黃色的；雷訥是羅弗敦最經典的明信片畫面；Å 是 E10 的終點。" },
        { sub: "中段：烏塔克萊夫、豪克蘭海灘", p: "白天是雪山配海灘，晚上是看極光的經典地點。北側海灘面向北方，地平線開闊。" },
        { sub: "東側：斯沃爾韋爾、亨寧斯韋爾", p: "斯沃爾韋爾是東側最大的鎮，生活機能最好。亨寧斯韋爾是建在小島群上的漁村，冬天正值鱈魚季，港口掛滿晾魚乾的木架。有名的海上足球場經典照片是空拍，站在地面看不太出來。" },
        { h: "旅人怎麼說", quote: "冬天絕對值得，但這時的羅弗敦比較安靜、陰鬱、難以預測。期待穩定的天氣就會失望。" },
        { p: "3 月中去的旅客說主要道路清得很快，配釘胎慢慢開不難。中文平台上「冬天不適合自駕」的說法，多半來自推銷包團的業者。" },
        { note: "部分餐廳冬天會休息，超市選擇也少。雷訥布林根登山步道冬天很危險，不建議爬。有車就能看雲量往晴的一側移動追極光。" }
      ] },

    { id: "nutshell", name: "挪威縮影", region: "bgo", tier: "must",
      line: "一天看完峽灣、高山鐵路和雪原。從卑爾根當天來回，不帶行李。",
      blocks: [
        { h: "依序會經過", stops: [
          "<b>卑爾根到沃斯</b>：08:29 搭火車，09:41 到沃斯",
          "<b>沃斯到古德旺恩</b>：10:10 轉巴士下山，11:10 到峽灣邊",
          "<b>納柔依峽灣遊船</b>：12:00 開船，14:00 到弗洛姆。世界遺產，兩岸峭壁非常窄",
          "<b>弗洛姆鐵路</b>：14:30 出發，15:14 到米達爾，約 20 公里爬升 800 多公尺",
          "<b>米達爾回卑爾根</b>：15:56 搭卑爾根鐵路，18:17 回到卑爾根" ] },
        { h: "旅人怎麼說", p: "冬天評價兩極。有台灣旅人 3 月走，說雪景美到讓人忘記呼吸；也有人覺得冬天弗洛姆鐵路景色普通，瀑布整個結冰。還有人遇到火車取消，改坐好幾個小時的巴士。" },
        { note: "天氣不好或峽灣結冰時，遊船會改成從弗洛姆出發的來回航程，古德旺恩到弗洛姆改搭巴士；改搭 12:00 的弗洛姆來回船，仍接得上 14:30 的鐵路。比較需要擔心的是卑爾根鐵路因冰雪延誤，所以 3/11 留作備用日。" }
      ] },

    { id: "bergen", name: "卑爾根", region: "bgo", tier: "worth",
      line: "峽灣入口的港口城市，彩色木屋街是世界遺產。",
      blocks: [
        { list: [
          "<b>布呂根</b>：港邊一排彩色木造倉庫，漢薩同盟時期的商館，世界遺產",
          "<b>弗洛伊恩纜車</b>：上山看整個港灣，晚上夜景很美",
          "<b>魚市場</b>：港邊吃海鮮" ] },
        { p: "論壇上的評價是「值得待一天」。缺點是挪威最常下雨的城市之一。" }
      ] },

    { id: "gdansk", name: "格但斯克", region: "gdn", tier: "must",
      line: "波羅的海邊的漢薩港口古城，冬天安靜又有氣氛。",
      blocks: [
        { h: "有什麼", list: [
          "<b>長街與長市場</b>：兩旁是彩色的山牆商人房屋，最經典的畫面",
          "<b>莫特瓦瓦河畔</b>：老倉庫和中世紀木造起重機，傍晚散步很美",
          "<b>琥珀</b>：這一帶是波羅的海琥珀的產地，老城有很多琥珀店" ] },
        { h: "旅人怎麼說", quote: "冬天比華沙和克拉科夫更安靜、更有氣氛，窄巷和彩色建築在冬天有一層霜的光澤。" },
        { note: "海邊冬天風很大。" }
      ] },

    { id: "malbork", name: "馬爾堡城堡", region: "gdn", tier: "must",
      line: "世界最大的紅磚城堡，從格但斯克搭火車約 30～40 分鐘。",
      blocks: [
        { p: "13 世紀條頓騎士團建造的總部，世界遺產。規模非常驚人，室內展區多，冬天去也不怕冷。" }
      ] },

    { id: "sopot", name: "索波特", region: "gdn", tier: "worth",
      line: "格但斯克旁的海濱小鎮，有歐洲最長的木造海上棧橋。",
      blocks: [
        { p: "從格但斯克搭通勤火車約 20～30 分鐘。冬天的波羅的海是灰藍色的，適合排半天輕鬆逛。" }
      ] },

    { id: "warsaw", name: "華沙", region: "waw", tier: "worth",
      line: "二戰後依原貌重建的首都，歷史感很強，但不是驚艷型的城市。",
      blocks: [
        { h: "有什麼", list: [
          "<b>老城與王宮</b>：重建的老城本身就列入世界遺產",
          "<b>瓦津基公園</b>：有蕭邦紀念碑，冬天常有蕭邦音樂會",
          "<b>科學文化宮</b>：頂樓可以看整個華沙",
          "<b>華沙起義博物館</b>：對二戰歷史有興趣的人評價很高" ] },
        { h: "旅人怎麼說", p: "評價兩極：有人說是波蘭比較無聊的城市，也有人喜歡老城的書店咖啡館和人少的氣氛。台灣旅人普遍稱讚火車準點、刷卡普及、治安好。" },
        { note: "Yulun 2/26、2/27 先住這裡。3/14 是週日，大部分商店公休。3/16 從這裡飛回台灣。" }
      ] }
  ],

  info: {
    baggage: [
      { seg: "阿聯酋（Yulun）", text: "託運 25 公斤，手提 1 件 7 公斤" },
      { seg: "阿聯酋（May）", text: "依她的票種；查價時的彈性票價是託運 30 公斤，手提 7 公斤" },
      { seg: "挪威航空 華沙→奧斯陸、奧斯陸→特羅姆瑟", text: "託運 1 件，每件最多 23 公斤；座位下小包＋登機箱合計 10 公斤" },
      { seg: "Widerøe 兩段", text: "Smart 票種：1 件託運＋登機箱，重量上限待確認" },
      { seg: "Wizz Air 卑爾根→格但斯克", text: "WIZZ Go：託運 20 公斤，整趟最嚴，打包以這段為準" }
    ],
    coming: ["緊急電話與駐外館處", "App 清單（交通、叫車、極光預報）", "貨幣與付款", "挪威冬季自駕", "入境規定（出發前一個月查最新公告）", "穿著與裝備", "行前待辦"]
  },

  notes: {
    pending: [
      "羅弗敦要不要加到 5 晚：卑爾根改 2 晚（沒有備用日），或奧斯陸改 1 晚",
      "May 的阿聯酋機票（她自己訂）：去程 2/27 EK367＋EK159，回程 3/16 和 Yulun 同班。台新優惠可以用到 12/31，條件還要確認",
      "2/28 在奧斯陸機場怎麼會合",
      "華沙飛奧斯陸的票價待補"
    ],
    cost: [
      "兩人同行的段落每人約 NT$23,949：奧斯陸飛特羅姆瑟、兩段 Widerøe、挪威縮影、卑爾根飛格但斯克。不含波蘭火車和租車",
      "Yulun 另加阿聯酋來回 NT$27,236，以及華沙飛奧斯陸（金額待補）",
      "May 另加阿聯酋開口票，參考價 NT$33,112（台新優惠價）或 NT$35,362（原價）"
    ],
    places: [
      { id: "sweden-lapland", name: "瑞典拉普蘭", tier: "maybe", polar: true,
        line: "基律納、冰旅館和阿比斯庫。目前路線沒有排。",
        blocks: [
          { p: "阿比斯庫以「藍洞」晴空微氣候聞名，但強調這點的大多是業者和觀光單位，雲量資料解析度不夠，無法驗證。旅人經驗偏正面，也有住兩晚完全沒看到的例子。" },
          { p: "十一年的雲量資料顯示，基律納住 3 晚遇到晴夜的機率約 71%，特羅姆瑟約 51%。" },
          { note: "從埃弗內斯開過去要翻越 Bjørnfjell 山口，冬天強風加降雪時 E10 會封路或改車隊通行。" }
        ] },
      { id: "stockholm", name: "斯德哥爾摩", tier: "worth",
        line: "蓋在 14 座島上的首都，瓦薩博物館是必看。",
        blocks: [ { p: "瓦薩沉船博物館、地鐵藝術、老城。2 月白天只有約 8 小時，適合當作進出點。" } ] },
      { id: "helsinki", name: "赫爾辛基", tier: "worth",
        line: "設計感很強的首都，岩石教堂和芬蘭桑拿是亮點。",
        blocks: [ { p: "岩石教堂、議會廣場、Löyly 桑拿；從斯德哥爾摩可搭過夜郵輪。" } ] },
      { id: "finland-lapland", name: "芬蘭拉普蘭", tier: "maybe", polar: true,
        line: "3 月晴天比例是資料中最高的，但從挪威、瑞典過去很繞。",
        blocks: [ { p: "羅瓦涅米 3 月每晚晴天的比例約 50%。要去的話選一個據點住 3 晚以上，伊納里、沙利色爾卡比較安靜。" } ] }
    ],
    skip: [
      { name: "羅瓦涅米聖誕老人村", text: "大量評論說是觀光陷阱，拍照要 39.5 歐元（約台幣 1,400）。", alt: "改去伊納里或沙利色爾卡" },
      { name: "住冰旅館的冰屋", text: "每晚約 320 美元起（約台幣 10,200），住過的人形容是很昂貴的帳篷體驗。", alt: "買參觀門票就能看到全部冰雕房間" },
      { name: "高價玻璃屋", text: "玻璃起霧、被雪蓋住，陰天時就只是一間很貴的房間。", alt: "住有桑拿的一般小木屋" },
      { name: "陰天去阿比斯庫極光觀測站", text: "有人兩人付了 1,190 瑞典克朗（約台幣 4,800），陰天下山很失望。", alt: "只在新月、預報晴天的晚上去" },
      { name: "半夜的沿岸郵輪", text: "凌晨 1:30 開船、候船室夜間關閉、靠引擎的艙房很吵。", alt: "特羅姆瑟飛埃弗內斯，機場原地租還車" },
      { name: "3 月去特羅姆瑟賞鯨", text: "賞鯨季是 11 月到 1 月。" },
      { name: "第一次體驗桑拿就去 Sompasauna", text: "沒有廁所、更衣室、置物櫃，唯一的沖洗方式是跳進海裡。", alt: "Löyly" }
    ]
  }
};
