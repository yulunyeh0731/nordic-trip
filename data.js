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
      address: "ul. Tamka 38, 00-355 Warszawa", lat: 52.2370, lng: 21.0236, status: "booked", note: "房價不含早餐，現場付款" },
    { id: "osl", area: "奧斯陸", name: "", from: "2027-02-28", nights: 2, status: "pending" },
    { id: "tos", area: "特羅姆瑟", name: "", from: "2027-03-02", nights: 3, status: "pending" },
    { id: "lof1", area: "雷訥一帶", name: "", from: "2027-03-05", nights: 2, status: "pending", note: "找有廚房的住處" },
    { id: "lof2", area: "亨寧斯韋爾或斯沃爾韋爾一帶", name: "", from: "2027-03-07", nights: 2, status: "pending", note: "找有廚房的住處" },
    { id: "bgo", area: "卑爾根", name: "", from: "2027-03-09", nights: 3, status: "pending" },
    { id: "gdn", area: "格但斯克", name: "", from: "2027-03-12", nights: 2, status: "pending" },
    { id: "waw2", area: "華沙", name: "", from: "2027-03-14", nights: 2, status: "pending" }
  ],

  days: [
    { date: "2027-02-25", title: "Yulun 出發", region: "tw",
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          bag: "託運 25 公斤，手提 7 公斤", status: "booked",
          price: "來回 NT$27,236（含稅）" }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場"] },

    { date: "2027-02-26", title: "Yulun 抵達華沙", region: "waw", city: "waw",
      legs: [
        { who: "Y", t: "flight", carrier: "阿聯酋", no: "EK179",
          from: "杜拜 DXB", fromNote: "第三航廈", dep: "07:50",
          to: "華沙 WAW", toNote: "A 航廈", arr: "11:30",
          bag: "託運 25 公斤，手提 7 公斤", status: "booked" },
        { who: "Y", t: "taxi", text: "Bolt 到旅館" }
      ],
      free: [{ who: "Y", when: "下午～晚上", text: "抵達後在住處附近走走，調時差", areas: ["powisle", "old"] }] },

    { date: "2027-02-27", title: "Yulun 華沙一日；May 深夜出發", region: "waw", city: "waw",
      free: [{ who: "Y", when: "全天", text: "週六博物館都有開。May 這天還沒到，Yulun 自己想看的展館排在今天", areas: ["old", "powisle", "centrum"] }],
      legs: [
        { who: "M", t: "flight", carrier: "阿聯酋", no: "EK367",
          from: "台北 TPE", fromNote: "第二航廈", dep: "23:00",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "04:45", plus: 1,
          status: "self", price: "參考價 NT$19,592（台新優惠價），原價 NT$21,342" }
      ] },

    { date: "2027-02-28", title: "飛奧斯陸，兩人會合", region: "osl", places: ["oslo"],
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

    { date: "2027-03-01", title: "奧斯陸市區、咖啡", region: "osl", places: ["oslo"],
      plan: ["市區一日：歌劇院屋頂、精品咖啡（Tim Wendelboe、Fuglen）"] },

    { date: "2027-03-02", title: "飛特羅姆瑟", region: "tos", places: ["tromso"],
      legs: [
        { t: "flight", carrier: "挪威航空", no: "",
          from: "奧斯陸 OSL", dep: "10:30", to: "特羅姆瑟 TOS", arr: "12:30",
          bag: "LowFare+，含 23 公斤託運", status: "pending",
          price: "USD 137.30（約 NT$4,435），價格待更新" }
      ] },

    { date: "2027-03-03", title: "特羅姆瑟，挑晴天報極光團", region: "tos", places: ["tromso"],
      plan: ["看雲量預報，挑最晴的一晚報極光團",
             "選小團、評價高、可改期的業者，報名前問清楚會不會跨境追晴天。Flexitour 是候選（出發 24 小時前取消可退 95%）"] },

    { date: "2027-03-04", title: "哈士奇雪橇", region: "tos", places: ["tromso"],
      plan: ["哈士奇雪橇", "極光團沒看到的話再報一次"] },

    { date: "2027-03-05", title: "飛埃弗內斯取車，往西", region: "lof", places: ["lofoten"],
      legs: [
        { t: "flight", carrier: "Widerøe", no: "",
          from: "特羅姆瑟 TOS", dep: "10:55", to: "埃弗內斯 EVE", arr: "12:15", via: "安德內斯",
          bag: "Smart：1 件託運＋登機箱", status: "pending",
          price: "749 挪威克朗（約 NT$2,502）" },
        { t: "car", text: "埃弗內斯機場取車（四驅、自排、雪胎），往西開到雷訥一帶", status: "pending" }
      ] },

    { date: "2027-03-06", title: "羅弗敦西側", region: "lof", places: ["lofoten"],
      plan: ["西側一日：雷訥、哈姆諾伊、薩克里索伊、Å"] },

    { date: "2027-03-07", title: "往東移動", region: "lof", places: ["lofoten"],
      legs: [
        { t: "car", text: "往東移動，沿途可停烏塔克萊夫、豪克蘭海灘" }
      ] },

    { date: "2027-03-08", title: "羅弗敦東側，新月", region: "lof", places: ["lofoten"],
      plan: ["東側一日：亨寧斯韋爾漁村"],
      notes: ["新月，整趟最暗的一夜"] },

    { date: "2027-03-09", title: "還車，飛卑爾根", region: "bgo", places: ["bergen"],
      legs: [
        { t: "car", text: "開回埃弗內斯機場還車" },
        { t: "flight", carrier: "Widerøe", no: "",
          from: "埃弗內斯 EVE", dep: "13:55", to: "卑爾根 BGO", arr: "16:40", via: "特隆赫姆",
          bag: "Smart：1 件託運＋登機箱", status: "pending",
          price: "1,599 挪威克朗（約 NT$5,341）" }
      ] },

    { date: "2027-03-10", title: "挪威縮影一日", region: "bgo", places: ["nutshell"],
      legs: [
        { t: "tour", text: "挪威縮影一日來回", dep: "08:29", arr: "18:17", status: "pending",
          price: "兩人 4,976 挪威克朗（每人約 NT$8,310）" }
      ],
      notes: ["冬天遊船可能改航線，詳細時刻和備案見地點介紹"] },

    { date: "2027-03-11", title: "卑爾根市區／備用日", region: "bgo", places: ["bergen"],
      plan: ["卑爾根市區：布呂根、弗洛伊恩纜車、魚市場"],
      notes: ["挪威縮影如果停駛，改在這天走"] },

    { date: "2027-03-12", title: "飛格但斯克", region: "gdn", places: ["gdansk"],
      legs: [
        { t: "flight", carrier: "Wizz Air", no: "",
          from: "卑爾根 BGO", dep: "13:40", to: "格但斯克 GDN", arr: "15:25",
          bag: "WIZZ Go：託運 20 公斤", status: "pending",
          price: "1,006 挪威克朗（約 NT$3,361）" }
      ],
      plan: ["傍晚逛老城長街、河畔"] },

    { date: "2027-03-13", title: "馬爾堡或索波特", region: "gdn", places: ["malbork", "sopot"],
      plan: ["馬爾堡城堡，或索波特海上棧橋"] },

    { date: "2027-03-14", title: "火車到華沙", region: "waw", city: "waw",
      legs: [
        { t: "train", text: "波蘭國鐵，格但斯克到華沙，約 2.5～3 小時", status: "pending",
          price: "約 19～32 英鎊，出發前約 30 天開賣" }
      ],
      free: [{ when: "抵達後", text: "週日博物館有開、商店大多公休。兩人想一起看的展館排在今天", areas: ["old", "powisle"] }],
      notes: ["週日，超市大多公休；Żabka 便利商店通常有開，餐廳不受影響"] },

    { date: "2027-03-15", title: "華沙一日", region: "waw", city: "waw",
      free: [{ when: "全天", text: "週一王宮和國家博物館休館，適合公園、觀景台和市區散步", areas: ["centrum", "lazienki", "old"] }] },

    { date: "2027-03-16", title: "華沙起飛回台", region: "sky",
      legs: [
        { t: "flight", carrier: "阿聯酋", no: "EK180",
          from: "華沙 WAW", fromNote: "A 航廈", dep: "13:40",
          to: "杜拜 DXB", toNote: "第三航廈", arr: "22:55",
          bag: "託運 25 公斤，手提 7 公斤", status: "booked", statusText: "Yulun 已訂，May 自訂",
          price: "Yulun 含在來回票裡；May 參考價 NT$13,520（台新優惠價），原價 NT$14,020" }
      ],
      notes: ["阿聯酋建議起飛前 3 小時到機場，也就是 10:40 前"] },

    { date: "2027-03-17", title: "抵達台北", region: "sky",
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
      ] }
  ],

  /* 城市 → 區域 → 地點
     type：sight 景點、food 吃、cafe 咖啡
     closed：公休的星期（0 週日、1 週一 … 6 週六），手冊會自動標出「當天公休」
     lat、lng：大約座標，用來算離住處的直線距離 */
  cities: {
    waw: {
      name: "華沙", region: "waw", ref: "waw1", mapCity: "Warszawa",
      intro: "二戰後依原貌重建的首都，老城列入世界遺產。不是驚艷型的城市，適合慢慢走、看美術館、坐咖啡館。",
      tips: [
        "週日商店公休：超市大多不開，Żabka 便利商店、藥局、麵包店、加油站例外，Żabka 多數開到 23:00。餐廳不受影響。",
        "週一多數博物館休館（王宮、國家博物館、華沙博物館）。兩人一起在華沙的是 3/14 週日和 3/15 週一，想一起看的展館要排在 3/14。",
        "老城廣場旁的餐廳偏貴、偏觀光，在地人吃家常菜多去牛奶吧。",
        "華沙起義博物館、POLIN 猶太歷史博物館評價很高，但屬於戰爭和近代史主題，要有中文導覽才適合；有沒有中文語音導覽待查。",
        "營業時間各來源常常不一致，標示的是 2025～2026 年的資料，出發前一個月再確認一次。"
      ],
      areas: [
        { id: "powisle", name: "住處周邊：新世界街一帶", line: "Motel One 就在這區，走路就到新世界街和王宮之路。" },
        { id: "old", name: "王宮之路與老城", line: "戰後重建、列入世界遺產的老城和王宮。" },
        { id: "centrum", name: "市中心：科學文化宮、Marszałkowska", line: "蘇聯時期的地標和市中心商圈，平價餐廳和咖啡店多。" },
        { id: "lazienki", name: "瓦津基公園", line: "王室夏宮和大公園，水上宮殿裡有國王的畫廊。" }
      ],
      pois: [
        { id: "stor", area: "powisle", type: "cafe", name: "STOR Cafe", local: "ul. Tamka 33", q: "STOR Cafe Tamka 33 Warszawa",
          line: "華沙最早的精品咖啡店之一，招牌是手沖，和住處同一條街。",
          tip: "華沙在地雜誌說，很多人覺得這是全波蘭最好的咖啡館。", lat: 52.2368, lng: 21.0228 },
        { id: "natmuseum", area: "powisle", type: "sight", name: "國家博物館", local: "Muzeum Narodowe w Warszawie",
          line: "波蘭最大的美術館，有歐洲古典繪畫和波蘭歷史畫。", time: "2～3 小時",
          hours: "週二～週日 10:00–18:00，週五到 20:00", closed: [1], free: "週二常設展免費",
          tip: "馬泰伊科的巨幅歷史畫《格倫瓦德之戰》在這裡。", lat: 52.2316, lng: 21.0249 },
        { id: "chopin", area: "powisle", type: "sight", name: "蕭邦博物館", local: "Muzeum Fryderyka Chopina",
          line: "全世界最多蕭邦手稿和遺物的博物館，就在住處對面。", closed: [1], warn: "整修中",
          hours: "2026 年整修休館，預計 2027 年重開，日期未定",
          tip: "重開後採整點入場。出發前要確認 2 月底、3 月中有沒有開。", lat: 52.2366, lng: 21.0216 },
        { id: "wedel", area: "powisle", type: "cafe", name: "Wedel 巧克力咖啡館", local: "Pijalnia Czekolady E. Wedel, Szpitalna 8",
          line: "1894 年開的熱巧克力老店，波蘭的國民巧克力品牌。", lat: 52.2344, lng: 21.0125 },
        { id: "bristol", area: "old", type: "cafe", name: "Cafe Bristol", local: "Krakowskie Przedmieście 42/44", q: "Cafe Bristol Warszawa",
          line: "1901 年開業的維也納風老咖啡館，在布里斯托飯店一樓。",
          tip: "招牌是維也納咖啡和奶油千層派（kremówka）。", lat: 52.2428, lng: 21.0153 },
        { id: "castle", area: "old", type: "sight", name: "華沙王宮", local: "Zamek Królewski",
          line: "歷代國王的居所，有林布蘭的兩幅肖像，還有貝洛托畫的 23 幅華沙城景。", time: "2～3 小時",
          hours: "週二～週日開放；冬季時間各來源不一，週日較早關", closed: [1], free: "週三常設展免費",
          tip: "旅人說重建得非常逼真，慢慢看可以待到三小時。", lat: 52.2479, lng: 21.0143 },
        { id: "oldsquare", area: "old", type: "sight", name: "老城廣場與甕城", local: "Rynek Starego Miasta, Barbakan",
          line: "彩色山牆房屋圍成的廣場，中央是華沙美人魚像；往北走到紅磚甕城和新城。", time: "1 小時",
          hours: "戶外，隨時可去", lat: 52.2497, lng: 21.0122 },
        { id: "muzwarszawy", area: "old", type: "sight", name: "華沙博物館", local: "Muzeum Warszawy",
          line: "在老城廣場邊的 11 棟老房子裡，講華沙的城市史。", time: "1.5 小時",
          hours: "週二～週五 9:00–17:00（週四到 19:00），週末 11:00–18:00", closed: [1], free: "週四免費",
          lat: 52.2502, lng: 21.0121 },
        { id: "concert", area: "old", type: "sight", name: "蕭邦音樂會", local: "Muzeum Archidiecezji Warszawskiej",
          line: "總教區博物館每天 18:30 的蕭邦音樂會，票價 45 茲羅提（約台幣 360）。",
          tip: "蕭邦博物館整修期間的替代方案。這是 2026 年的資訊。", lat: 52.2486, lng: 21.0131 },
        { id: "zapiecek", area: "old", type: "food", name: "Zapiecek 波蘭餃子", local: "Freta 18 等多家分店", q: "Zapiecek Freta 18 Warszawa",
          line: "連鎖波蘭餃子店，老城就有好幾家，台灣交換生最常推薦。",
          tip: "台灣學生推薦點煎的，不要點水煮的；觀光客多時要排隊。人均約台幣 400～500（2023 年記錄）。",
          lat: 52.2522, lng: 21.0093 },
        { id: "barbakan", area: "old", type: "food", name: "Pod Barbakanem 牛奶吧", local: "Bar Mleczny Pod Barbakanem",
          line: "老城牆邊的牛奶吧，用很低的價格吃家常波蘭菜。",
          tip: "牛奶吧是自己到櫃台點餐的平價食堂，吃完就走。", lat: 52.2509, lng: 21.0102 },
        { id: "pkin", area: "centrum", type: "sight", name: "科學文化宮觀景台", local: "Pałac Kultury i Nauki，30 樓", q: "Pałac Kultury i Nauki Warszawa",
          line: "在 30 樓看整個華沙，也是少數週一有開的景點。", time: "1 小時",
          hours: "每天 10:00–20:00（節日和活動時會變）",
          tip: "台灣交換生推薦離開華沙前上去道別；也有旅人覺得景色不錯但稱不上震撼。", lat: 52.2318, lng: 21.0060 },
        { id: "prasowy", area: "centrum", type: "food", name: "Bar Prasowy 牛奶吧", local: "Marszałkowska 10/16", q: "Bar Prasowy Marszałkowska 10/16 Warszawa",
          line: "1954 年開業的牛奶吧，裝潢翻新過，在地人和留學生最常推薦。",
          tip: "平日中午 12～14 點人最多。", lat: 52.2189, lng: 21.0181 },
        { id: "koszyki", area: "centrum", type: "food", name: "Hala Koszyki 美食市場", local: "Koszykowa 63", q: "Hala Koszyki Warszawa",
          line: "老市場改建的美食街，約 30 個攤位，波蘭菜到亞洲菜都有。",
          tip: "兩人想吃的不一樣時很方便。", lat: 52.2226, lng: 21.0126 },
        { id: "ministerstwo", area: "centrum", type: "cafe", name: "Ministerstwo Kawy", local: "Marszałkowska", q: "Ministerstwo Kawy Warszawa",
          line: "華沙知名的精品咖啡店，用瑞典烘豆商 Koppi 的豆子。", lat: 52.2237, lng: 21.0161 },
        { id: "charlotte", area: "centrum", type: "cafe", name: "Charlotte", local: "Plac Zbawiciela", q: "Charlotte Plac Zbawiciela Warszawa",
          line: "法式麵包店咖啡館，在市中心最熱鬧的廣場上，適合吃早餐。", lat: 52.2196, lng: 21.0172 },
        { id: "palaceisle", area: "lazienki", type: "sight", name: "水上宮殿", local: "Pałac na Wyspie",
          line: "湖中的古典主義宮殿，裡面是末代國王收藏的畫廊。", time: "公園加宮殿 1.5～2 小時",
          hours: "內部開放時間出發前查官網",
          tip: "冬天最好下午 2 點前開始逛，天黑得早，地面也可能濕滑泥濘。", lat: 52.2150, lng: 21.0353 },
        { id: "chopinmon", area: "lazienki", type: "sight", name: "蕭邦紀念碑", local: "Pomnik Fryderyka Chopina",
          line: "公園入口附近的蕭邦雕像。",
          tip: "戶外蕭邦音樂會只在 5 月中到 9 月底的週末，3 月沒有。", lat: 52.2146, lng: 21.0270 }
      ]
    },
    osl: { name: "奧斯陸", region: "osl", places: ["oslo"] },
    tos: { name: "特羅姆瑟", region: "tos", places: ["tromso"] },
    lof: { name: "羅弗敦", region: "lof", places: ["lofoten"] },
    bgo: { name: "卑爾根", region: "bgo", places: ["bergen", "nutshell"] },
    gdn: { name: "格但斯克", region: "gdn", places: ["gdansk", "malbork", "sopot"] }
  },
  cityOrder: ["waw", "osl", "tos", "lof", "bgo", "gdn"],

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
