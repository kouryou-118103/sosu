let numberToCheck;
let maxNumber;
let sosukeisu = 0.5;

function startGame() {
  const inputValue = document.getElementById("maxNumberInput").value;

  // 入力を数値に変換
  maxNumber = parseInt(inputValue, 10);
  console.log("最大値は"+inputValue);

  // 範囲チェック
  if (isNaN(maxNumber) || maxNumber < 2 || maxNumber > 9999999999999) {
    alert("2以上、10^13-1以下の整数を入力してください。");
    return;
  }

  // ゲームエリアを表示
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("startButton").style.display = "none";

  // 最初の数字を生成
  numberToCheck = generateRandomNumber(maxNumber,0);
  document.getElementById("numberDisplay").textContent = numberToCheck.toLocaleString("en-US");
}

function generateRandomNumber(maxNumber, A) {
  let shouldReturnPrime;  // ここで一度だけ定義
  const random = Math.floor(Math.random() * (maxNumber - 1)) + 2; // 2~maxまでのランダムな数字を生成
  if (A === 0) {
    shouldReturnPrime = Math.random() <= sosukeisu;
  } else if (A === 1) {
    // 常に素数を選ぶ
    shouldReturnPrime = true;
  } else {
    // 常に合成数を選ぶ
    shouldReturnPrime = false;
  }
  // 素数を返す場合
  if (shouldReturnPrime) {
    if (isPrimeNumber(random)) {
      return random;  // 素数の場合、そのまま返す
    } else {
      return generateRandomNumber(maxNumber, 1);  // 素数でない場合は再帰で別の数字を生成
    }
  } else {
    // 合成数を返す場合
    if (!isPrimeNumber(random)) {
      return random;  // 合成数の場合、そのまま返す
    } else {
      return generateRandomNumber(maxNumber, 2);  // 合成数の場合は再帰で別の数字を生成
    }
  }
}



function checkPrime(isPrime) {
  console.log(numberToCheck+"の判定開始")
  const isNumberPrime = isPrimeNumber(numberToCheck);
  const resultElement = document.getElementById("resultMessage");
  const linkContainer = document.createElement("ul");  
  // 判定結果のメッセージをリセット
  resultElement.innerHTML = "";

  if (isPrime === isNumberPrime) {
    resultElement.textContent = "正解！";
  } else {
    resultElement.textContent = "不正解...";
  }

  // 素因数分解または素数表示
  if (isNumberPrime) {
    resultElement.innerHTML += `<br>${numberToCheck.toLocaleString("en-US")} = ${numberToCheck.toLocaleString("en-US")}<br>`;
    console.log(numberToCheck+"は素数")
  } else {
    const factors = primeFactors(numberToCheck).map((num) => num.toLocaleString("en-US")).join(" × ");
    resultElement.innerHTML += `<br>\\(${numberToCheck.toLocaleString("en-US")} = ${factors}\\)<br>`;
    console.log(numberToCheck+"は素数ではない")
  }

  if (isNumberPrime||numberToCheck==57) {
    resultElement.innerHTML += "この素数(または合成数)は↓に当てはまります。";

    const primeLinks = [];
    if (isNumberPrime){
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime.html", text: "素数" });
    }else{
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-grothendieck.html", text: "グロタンディーク素数" });
    }
    // 各素数の特性に対応したリンクを追加
    if (isTwinPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-twin.html", text: "双子素数" });
    }
    if (isSexyPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-sexy.html", text: "セクシー素数" });
    }
    if (isTripletPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-triplet.html", text: "三つ子素数" });
    }
    if (isCousinPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-cousin.html", text: "いとこ素数" });
    }
    if (isMersennePrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-mersenne.html", text: "メルセンヌ素数" });
    }
    if (isFermatPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-fermat.html", text: "フェルマー素数" });
    }
    if (isRepunitPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-repunit.html", text: "レピュニット素数" });
    }
    if (isSuperPrime(numberToCheck)){
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-super.html", text: "スーパー素数" });
    }
    if (isSophieGermainPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-sophie.html", text: "ソフィー・ジェルマン素数" });
    }
    if (isSafePrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-safe.html", text: "安全素数" });
    }
    if (isPalindromicPrime(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-palindromic.html", text: "回文素数" });
    }
    if (isEmirp(numberToCheck)) {
      primeLinks.push({ url: "https://kouryou-118103.github.io/sosu/prime-emirp.html", text: "エマープ" });
    }
    console.log(primeLinks)
    // リンクを生成して表示
    resultElement.innerHTML += primeLinks.map(link => `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`).join("");
    resultElement.innerHTML += 'また、まだ判定機能の無い以下の素数(合成数)の可能性もあります。'
    const Apple=[]
    Apple.push({ url: "https://kouryou-118103.github.io/sosu/prime-euler.html", text: "オイラー素数" });
    Apple.push({ url: "https://kouryou-118103.github.io/sosu/prime-lucas.html", text: "リュッカ素数" });
    Apple.push({ url: "https://kouryou-118103.github.io/sosu/prime-woodall.html", text: "ウッダル素数" });
    Apple.push({ url: "https://kouryou-118103.github.io/sosu/prime-carol.html", text: "キャロル素数" });
    Apple.push({ url: "https://kouryou-118103.github.io/sosu/prime-sierpinski.html", text: "サービト素数" });
    resultElement.innerHTML += Apple.map(link => `<li><a href="${link.url}" target="_blank">${link.text}</a></li>`).join("");
  }

  // MathJaxをレンダリング
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise();
  } else {
    MathJax.typeset();
  }
  console.log("素因数分解の結果→レンダリング完了")

  // 次の数字を生成
  numberToCheck = generateRandomNumber(maxNumber,0);
  document.getElementById("numberDisplay").textContent = numberToCheck.toLocaleString("en-US");
}

function isPrimeNumber(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 各素数の特性を判定する関数
function isTwinPrime(num) {
  return isPrimeNumber(num) && (isPrimeNumber(num - 2) || isPrimeNumber(num + 2));
}

function isSexyPrime(num) {
  return isPrimeNumber(num) && isPrimeNumber(num + 6);
}

function isTripletPrime(num) {
  if (!isPrimeNumber(num)) return false;
  return (isPrimeNumber(num + 2) && isPrimeNumber(num + 6)) ||
         (isPrimeNumber(num + 4) && isPrimeNumber(num + 6));
}

function isCousinPrime(num) {
  return isPrimeNumber(num) && isPrimeNumber(num + 4);
}

function isMersennePrime(num) {
  const exp = Math.log2(num + 1);
  return Number.isInteger(exp) && isPrimeNumber(exp) && isPrimeNumber(num);
}

function isFermatPrime(num) {
  const exp = Math.log2(Math.log2(num - 1));
  return Number.isInteger(exp) && isPrimeNumber(num);
}

function isRepunitPrime(num) {
  const str = num.toString();
  return isPrimeNumber(num) && str.split('').every(digit => digit === '1');
}

function isSuperPrime(num) {
  if (!isPrimeNumber(num)) {
    return false;
  }
  
  let count = 0;
  for (let i = 2; i <= num; i++) {
    if (isPrimeNumber(i)) {
      count++;
    }
  }
  return isPrimeNumber(count);
}

function isLucasPrime(num) {
  return isPrimeNumber(num); // 仮の条件
}

function isWoodallPrime(num) {
  return isPrimeNumber(num); // 仮の条件
}

function isSophieGermainPrime(num) {
  return isPrimeNumber(num) && isPrimeNumber(2 * num + 1);
}

function isSafePrime(num) {
  return isPrimeNumber(num) && isPrimeNumber((num - 1) / 2);
}

function isCarolPrime(num) {
  return isPrimeNumber(num); // 仮の条件
}

function isSierpinskiPrime(num) {
  return isPrimeNumber(num); // 仮の条件
}

function isPalindromicPrime(num) {
  return isPrimeNumber(num) && num.toString() === num.toString().split('').reverse().join('');
}

function isEmirp(num) {
  return isPrimeNumber(num) && isPrimeNumber(parseInt(num.toString().split('').reverse().join('')));
}

// 素因数分解
function primeFactors(n) {
  const factors = [];
  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  if (n > 2) factors.push(n);
  return factors;
}
