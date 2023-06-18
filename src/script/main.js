(function (d) {
  var config = {
    kitId: "aeo6pal",
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) { }
  };
  s.parentNode.insertBefore(tk, s);
})(document);

var scenarios = [
  {
    description:
      "離開老者往前行，陽光透過樹葉間的縫隙灑下，令森林充滿魔幻的氛圍。突然，你在路上發現了一隻小動物，它看起來孤單無助。你會...",
    options: [
      { value: "E", label: "靠近觀察和與它互動，嘗試幫助它找到家" },
      { value: "I", label: "在遠處欣賞它，但不打擾它，繼續前進" }
    ]
  },
  {
    description:
      "你繼續踏著青苔覆蓋的小徑，來到了一個分岔路口。在你面前，出現了兩條道路。你會...",
    options: [
      { value: "S", label: "細心觀察地圖或指南針，確定正確的方向" },
      {
        value: "N",
        label: "跟著直覺，選擇一條路繼續前進，相信它會帶你去一個有趣的地方"
      }
    ]
  },
  {
    description:
      "經過一段時間的行走，你看到一位陌生人坐在樹下，他覺得你看起來疲憊不堪，因此詢問你需要幫忙嗎。你會...",
    options: [
      {
        value: "F",
        label: "說出自己需要的幫助，並與他合作，一起尋找更好的出路"
      },
      {
        value: "T",
        label: "婉拒幫助，表示自己可以獨自應對，然後繼續自己的旅程"
      }
    ]
  },
  {
    description:
      "告別陌生人，在前行的過程中，你發現了一片美麗的花園，花園的盡頭有一道清澈的小溪。你很想走進花園，但進入花園需要穿越這條小溪。你會...",
    options: [
      {
        value: "J",
        label: "尋找一條可以跨越小溪的石頭或橋，確保自己可以安全到達花園"
      },
      {
        value: "P",
        label: "脫掉鞋子，冒著濕腳的風險，穿越小溪，享受沐浴在溪水中的感覺"
      }
    ]
  },
  {
    description:
      "當你繼續向前走時，你意外地發現了一座古老的神秘洞穴，洞穴的入口散發出微弱的光芒。你會...",
    options: [
      {
        value: "S",
        label: "踏進洞穴中，好奇地探索其中的秘密，期待著能夠發現什麼寶藏"
      },
      {
        value: "N",
        label:
          "在洞穴外觀察一會兒，感受著洞穴散發的神秘氛圍，但不敢進去，繼續向前走"
      }
    ]
  }
];

var currentScenarioIndex = 0;
var answers = [];

$(document).ready(function () {
  $("#test").hide();
  $("#wait").hide();
  $("#result").hide();
  $("#askName").hide();
  $("#goIntoForest").click(function () {
    $("#cover").hide();
    $("#askName").show();
  });

  $("#start").click(function () {
    var answerName = $("#name").val();
    if (answerName === "") {
      alert("請先輸入姓名或暱稱！");
    } else {
      $("#askName").hide();
      $("#test").show();
      showTest();
    }
  });
});

function showTest() {
  renderScenario();
  hideBtn();

  $("#nextBtn").click(function () {
    if (isAnswered()) {
      saveAnswer();
      currentScenarioIndex++;
      renderScenario();
      hideBtn();
    } else {
      alert("請先回答問題！");
    }
  });

  $("#waitBtn").click(function () {
    if (isAnswered()) {
      saveAnswer();
      $("#wait").show();
      $("#test").hide();
    } else {
      alert("請先回答問題！");
    }
  });

  $("#submitBtn").click(function () {
    if (isAnswered()) {
      $("#wait").hide();
      $("#result").show();
      saveAnswer();
      calculateResult();
    } else {
      alert("請先回答問題！");
    }
  });
}

function hideBtn() {
  // 控制按鈕顯示
  if (currentScenarioIndex < scenarios.length - 1) {
    $("#nextBtn").show();
    $("#waitBtn").hide();
  } else {
    $("#nextBtn").hide();
    $("#waitBtn").show();
  }
}

function isAnswered() {
  var selectedOption = $('input[name="q' + currentScenarioIndex + '"]:checked');
  return selectedOption.length > 0;
}

function renderScenario() {
  if (currentScenarioIndex < scenarios.length) {
    var scenario = scenarios[currentScenarioIndex];
    var scenarioHTML = "";
    scenarioHTML += "<p>" + scenario.description + "</p>";
    scenarioHTML += "<form>";

    for (var i = 0; i < scenario.options.length; i++) {
      var option = scenario.options[i];
      scenarioHTML +=
        '<input type="radio" name="q' +
        currentScenarioIndex +
        '" id="' +
        option.value +
        '" value="' +
        option.value +
        '"> ' +
        '<label for="' +
        option.value +
        '">' +
        option.label +
        "</label>";
    }

    scenarioHTML += "</form>";
    $("#scenarioContainer").html(scenarioHTML);
  } else {
    alert("已完成所有情境！");
  }
}

function saveAnswer() {
  var selectedOption = $('input[name="q' + currentScenarioIndex + '"]:checked');
  if (selectedOption.length > 0) {
    answers[currentScenarioIndex] = selectedOption.val();
  }
  // console.log(answers);
}

function calculateResult() {
  var result = "";

  // 計算 E 或 I
  var eCount = 0;
  var iCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "E") {
      eCount++;
    } else if (answer === "I") {
      iCount++;
    }
  }
  result += eCount > iCount ? "E" : "I";

  // 計算 S 或 N
  var sCount = 0;
  var nCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "S") {
      sCount++;
    } else if (answer === "N") {
      nCount++;
    }
  }
  result += sCount > nCount ? "S" : "N";

  // 計算 T 或 F
  var tCount = 0;
  var fCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "T") {
      tCount++;
    } else if (answer === "F") {
      fCount++;
    }
  }
  result += tCount > fCount ? "T" : "F";

  // 計算 J 或 P
  var jCount = 0;
  var pCount = 0;
  for (var i = 0; i < scenarios.length; i++) {
    var answer = answers[i];
    if (answer === "J") {
      jCount++;
    } else if (answer === "P") {
      pCount++;
    }
  }
  result += jCount > pCount ? "J" : "P";

  // 建立 MBTI 類型與動物名稱的對應表
  var animalNames = {
    ENTJ: "獅子",
    ENTP: "狐狸",
    ENFJ: "孔雀",
    ENFP: "蝴蝶",
    INTJ: "獨角獸",
    INTP: "貓頭鷹",
    INFJ: "灰狼",
    INFP: "水鹿",
    ESTJ: "老鷹",
    ESTP: "獵豹",
    ESFJ: "大象",
    ESFP: "黑熊",
    ISTJ: "浣熊",
    ISTP: "狼狗",
    ISFJ: "松鼠",
    ISFP: "鹿鼠"
  };

  // 建立動物名稱與描述的對應表
  var animalDescriptions = {
    獅子:
      "森林中的領導者，擅長用規範和經驗渲染他人，相當具有領導風範的類型。然而，他們的執著和硬派的管理風格有時會給身邊人帶來壓力。",
    狐狸:
      "機智靈活的探索者，擅長思考問題的各種可能性，喜歡挑戰常規。像狐狸一樣狡猾聰明，但有時也會因為好奇心而迷失方向。",
    孔雀:
      "充滿魅力和社交能力的孔雀，在人群中引人注目，善於建立和諧和支持他人。然而，他們有時也會在過於關注他人的需求時忽略了自己。",
    蝴蝶:
      "自由奔放的蝴蝶，充滿熱情和創造力。他們喜歡追求夢想，帶給周圍人活力和喜悅，但有時也容易感到不安定和難以捉摸。",
    獨角獸:
      "神秘而獨立的獨角獸，擅長分析和策劃，有著強大的洞察力和創新思維。他們在追求目標時常常非常堅定，但也因為內向而被認為神秘而難以理解。",
    貓頭鷹:
      "智慧而冷靜的觀察者，像貓頭鷹一樣喜歡追求知識和理解。他們擁有優秀的邏輯思維和分析能力，但有時也傾向於過度分析和與現實脫節。",
    灰狼:
      "敏銳而富有同理心的灰狼，善於理解他人的需求和情感。他們常常具有崇高的價值觀和使命感，但有時也會因為過於保護他人而忽略自己的需求。",
    水鹿:
      "敏感而和善的水鹿，具有豐富的情感世界和強烈的內在價值觀。像水鹿一樣，他們追求和平與和諧，但有時也容易感到壓力和情緒波動。",
    老鷹:
      "有著銳利洞察力和果斷決策能力的老鷹，擅長組織和管理。他們注重效率和結果，但有時也因為過於嚴格和不易妥協而與他人產生衝突。",
    獵豹:
      "追求刺激和冒險的獵豹，善於適應環境並迅速做出反應。他們勇於冒險並享受現在，但有時也容易變得過於衝動和不顧後果。",
    大象:
      "溫暖和藹的大象，關心他人並善於提供支持和幫助。他們重視傳統價值觀和社區關係，但有時也會因為過於關注他人的評價而忽略自己的需求。",
    黑熊:
      "活潑開朗的黑熊，喜歡享受當下並與他人互動。他們善於娛樂和帶給周圍人歡樂，但有時也會因為缺乏計劃性而面臨困難。",
    浣熊:
      "細心勤勞的浣熊，喜歡按部就班地處理任務和責任。他們是可靠的夥伴和良好的組織者，但有時也傾向於過度保守和固執。",
    狼狗:
      "獨立而機智的狼狗，擅長解決問題和應對挑戰。他們享受自由和冒險，但有時也會因為過於獨立而不願與他人合作。",
    松鼠:
      "細心而負責任的松鼠，善於收集和保管資源。他們擁有出色的記憶力和組織能力，注重細節並具有耐心，但有時也會因過於保守而錯過一些機會。",
    鹿鼠:
      "敏感而和諧的鹿鼠，追求藝術和美感。他們擁有豐富的情感世界和創造力，但有時也容易感到壓力和難以捉摸。"
  };

  // 建立動物名稱與能力值的對應表
  var animalAbilities = {
    "獅子": [9, 6, 8, 5, 4],
    "狐狸": [6, 9, 3, 8, 7],
    "孔雀": [5, 4, 2, 7, 9],
    "蝴蝶": [3, 7, 1, 6, 8],
    "獨角獸": [8, 5, 6, 9, 3],
    "貓頭鷹": [4, 8, 2, 9, 7],
    "灰狼": [9, 7, 7, 8, 6],
    "水鹿": [3, 6, 5, 7, 8],
    "老鷹": [7, 9, 6, 5, 6],
    "獵豹": [6, 9, 8, 4, 7],
    "大象": [8, 2, 9, 6, 3],
    "黑熊": [5, 6, 7, 3, 4],
    "浣熊": [4, 8, 3, 6, 7],
    "狼狗": [7, 8, 7, 5, 6],
    "松鼠": [3, 9, 2, 6, 8],
    "鹿鼠": [2, 7, 4, 5, 9]
  };

  // 建立動物的友好動物列表
  var animalFriends = {
    "獅子": "貓頭鷹",
    "狐狸": "獨角獸",
    "孔雀": "水鹿",
    "蝴蝶": "灰狼",
    "獨角獸": "狐狸",
    "貓頭鷹": "獅子",
    "灰狼": "蝴蝶",
    "水鹿": "孔雀",
    "老鷹": "狼狗",
    "獵豹": "浣熊",
    "大象": "鹿鼠",
    "黑熊": "松鼠",
    "浣熊": "獵豹",
    "狼狗": "老鷹",
    "松鼠": "黑熊",
    "鹿鼠": "大象"
  };

  // 顯示結果
  $("#submitBtn").hide();
  $("#scenarioContainer").hide();
  var mbtiType = result;
  var animalName = animalNames[mbtiType];
  var animalDescription = animalDescriptions[animalName];
  var animalAbility = animalAbilities[animalName];
  var imgSrc = "/src/image/animal/" + animalName + ".png";

  var answerHTML = "<h2>" + animalName + "</h2>";
  answerHTML += "<img src='" + imgSrc + "' width=150 height=150>";
  answerHTML += "<p>" + animalDescription + "</p>";

  $("#content").html(answerHTML);

  var animalFriend = animalFriends[animalName];
  var friendImgSrc = "/src/image/animal/" + animalFriend + ".png";
  var friendHTML = "<img src='" + friendImgSrc + "' width=100 height=100>";
  friendHTML += "<p>" + animalFriend + "</p>";

  $("#friend").html(friendHTML);

  // 能力值的維度
  var dimensions = ["領導能力", "敏捷性", "力量", "智慧", "靈敏度"];

  // 設定雷達圖的資料
  var data = {
    labels: dimensions,
    datasets: [{
      label: "能力值",
      data: animalAbility,
      backgroundColor: "rgba(255, 234, 138, 0.4)",
      borderColor: "rgba(255, 234, 138, 1)",
      pointBackgroundColor: "rgba(255, 234, 138, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 234, 138, 1)",
      color: "rgba(255, 234, 138, 1)"
    }]
  };

  // 設定雷達圖的選項
  var options = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 10,
      },
      pointLabels: {
        fontSize: 14,
      },
    },
    legend: {
      display: false,
    }
  };

  Chart.defaults.color = 'rgba(255, 234, 138, 1)';

  // 繪製雷達圖
  var ctx = document.getElementById("radarChart").getContext("2d");
  var radarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
  });


  // 在按鈕點擊後觸發的事件處理函式
  $("#shareBtn").on("click", function () {
    // 取得測驗結果
    var result = animalDescription;
    var answerName = $("#name").val();

    // 建立新的 Canvas 元素
    var canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280;
    var ctx = canvas.getContext("2d");

    // 建立背景圖片物件
    var backgroundImage = new Image();
    backgroundImage.src = "/src/image/canvas_background.jpg";

    // 背景圖片載入完成後繪製
    backgroundImage.onload = function () {
      // 繪製背景圖片
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // 設定標題文字樣式
      ctx.font = "bold 55px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製標題文字
      var titleText = answerName + "是...";
      ctx.fillText(titleText, canvas.width / 2, 130);

      // 設定動物文字樣式
      ctx.font = "bold 78px kaisei-tokumin";
      ctx.fillStyle = "#523721";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(255,255,255,0.5)";

      // 繪製動物文字
      var animalText = animalName;
      ctx.fillText(animalText, canvas.width / 2, canvas.height - 670);

      // 設定友好動物標題文字樣式
      ctx.font = "bold 40px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製友好動物標題文字
      ctx.fillText("友好動物", canvas.width / 2 + 180, canvas.height - 560);

      // 設定友好動物文字樣式
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 繪製友好動物標題文字
      ctx.fillText(animalFriend, canvas.width / 2 + 180, canvas.height - 340);

      // 設定測驗結果文字的樣式和位置
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // 設定測驗結果文字的最大寬度和行高
      var maxWidth = canvas.width - 40; // 距離邊界的空白距離
      var lineHeight = 42;

      // 定義測驗結果文字的起始位置
      var startX = canvas.width / 2;
      var startY = canvas.height - 260;

      // 將測驗結果文字進行換行處理
      var words = result.split("");
      var line = "";
      var lines = [];

      for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + "";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + "";
        } else {
          line = testLine;
        }
      }

      lines.push(line.trim());

      // 繪製測驗結果文字（換行處理後）
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], startX, startY + j * lineHeight);
      }

      // 設定雷達圖的參數
      var abilities = animalAbility;
      var dimensions = ["領導能力", "敏捷性", "力量", "智慧", "靈敏度"];
      var centerX = 230;
      var centerY = canvas.height - 450;
      var radius = 100;
      var angleCount = abilities.length;
      var angle = (Math.PI * 2) / angleCount;

      // 將能力值轉換為百分比
      var maxAbility = 10; // 最大值為 10
      var abilitiesInPercentage = abilities.map(function (ability) {
        return (ability / maxAbility) * 100;
      });

      // 在 canvas 上繪製雷達圖
      ctx.beginPath();
      for (var i = 0; i < angleCount; i++) {
        var currentAngle = angle * i - Math.PI / 2;
        var value = abilitiesInPercentage[i];
        var x = centerX + Math.cos(currentAngle) * ((radius * value) / 100);
        var y = centerY + Math.sin(currentAngle) * ((radius * value) / 100);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // 繪製維度名稱標籤
        var labelX = centerX + Math.cos(currentAngle) * (radius + 20);
        var labelY = centerY + Math.sin(currentAngle) * (radius + 20);
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(dimensions[i], labelX, labelY);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 234, 138, 0.7)";
      ctx.lineWidth = 5;
      ctx.fillStyle = "rgba(255, 234, 138, 0.3)";
      ctx.fill();
      ctx.stroke();

      var imgObj = new Image();
      imgObj.src = imgSrc;
      imgObj.onload = function () {
        ctx.drawImage(imgObj, canvas.width / 2 - 175, 200, 350, 350);

        var friendimgObj = new Image();
        friendimgObj.src = friendImgSrc;
        friendimgObj.onload = function () {
          ctx.drawImage(friendimgObj, 465, canvas.height - 525, 150, 150);

          // 建立圖片 URL
          var image = canvas.toDataURL("image/png");

          // 開啟新視窗
          var newWindow = window.open("", "_blank");

          // 在新視窗中插入圖片元素
          newWindow.document.open();
          newWindow.document.write('<p style="text-align:center">長按圖片保存分享</p><img src="' + image + '" alt="測驗結果" style="height: 100%;text-align:center;margin: 0 auto;">');
          newWindow.document.close();
        }
      };
    };
  });

}