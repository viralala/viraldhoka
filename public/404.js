// Same language as the rest of the site, picked from the saved choice
var T = {
  hi: ['मोर रास्ता भटक गया', 'यह पेज मौजूद नहीं है। पर मोर को वापसी का रास्ता पता है।', 'होम पर वापस जाएँ'],
  mr: ['मोर वाट चुकला', 'हे पान अस्तित्वात नाही. पण मोराला परतीची वाट माहीत आहे.', 'मुख्य पानावर परत जा'],
  de: ['Mor hat sich verlaufen', 'Diese Seite gibt es nicht. Er kennt den Weg zurück.', 'Zur Startseite'],
  es: ['Mor se ha perdido', 'Esta página no existe. Él conoce el camino de vuelta.', 'Volver al inicio'],
  zh: ['莫尔迷路了', '这个页面不存在。不过莫尔认得回去的路。', '返回首页'],
  fr: ['Mor s’est perdu', 'Cette page n’existe pas. Il connaît le chemin du retour.', 'Retour à l’accueil'],
  ja: ['モルが迷子になりました', 'このページは存在しません。でもモルは帰り道を知っています。', 'ホームに戻る'],
}
try {
  var l = localStorage.getItem('vd-lang')
  if (T[l]) {
    document.documentElement.lang = l
    document.getElementById('t').textContent = T[l][0]
    document.getElementById('b').textContent = T[l][1]
    document.getElementById('h').textContent = T[l][2]
    document.title = T[l][0]
    document.body.style.fontFamily = "'General Sans', 'Nirmala UI', 'Microsoft YaHei', 'Yu Gothic', system-ui, sans-serif"
  }
} catch (e) {}
