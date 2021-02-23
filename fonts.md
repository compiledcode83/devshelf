## Wydajny frontend - optymalizacja fontów

Szybkie wczytywanie fontów to temat, który jest bardzo często poruszany w kontekście optymalizacji naszych stron i aplikacji. Technik ładowania fontów jest mnóstwo, możemy korzystać z wielu formatów, zaciągać je z Google Fonts lub lokalnie, opcji jest naprawdę wiele... Jak się w tym wszystkim połapać i jak wybrać odpowiednią metodę?

## Google Fonts

Ładowanie fontów z serwerów Google jest obecnie najpopularniejszą metodą, korzysta z niej prawie [43 milionów stron!](https://trends.builtwith.com/websitelist/Google-Font-API). Zanim przejdziemy do tego, czy jest to dobra metoda, zobaczmy jak obecnie ładuje się w ten sposób fonty:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
  rel="stylesheet"
/>
```

Pamiętaj żeby **zawsze** wybierać sposób z `<link>`, ładowanie Google Fonts w CSS nie jest dobrą praktyką. Bardzo ważną rzeczą jest wybranie tylko tych fontów których potrzebujemy oraz dodanie `display=swap`, o którym jeszcze powiemy.

Dodanie tzw. _preconnecta_ pomaga nam usprawnić cały proces, ale nie jest to jeszcze najlepsze rozwiązanie. Tricków na poprawnę wydajności ładowania tych fontów jest wiele, w moim przypadku sprawdził się sposób Bartka z Web Dev Insider.

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
  as="style"
  rel="preload"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```

Korzystamy tutaj ze sztuczki, dzięki której ładujemy fonty asynchronicznie i nadajemy im wysoki priorytet.
Jeśli chcesz się dowiedzieć więcej o tym sposobie, to zachęcam Cię do zobaczenia [filmu z wyjaśnieniem](https://www.youtube.com/watch?v=Tep9q2JykpU).

## CDN

Przez lata fonty od Google były _cachowane_, jednak w ubiegłym roku [sytuacja się zmieniła](https://wicki.io/posts/2020-11-goodbye-google-fonts/)...Obecnie znacznie lepszym sposobem jest hostowanie fontów samodzielnie. Sam Google [przyznaje to już od 2018 roku](https://developers.google.com/web/updates/2018/08/web-performance-made-easy). Jeśli możesz wybieraj rozwiązania typu self hosted.

## Formaty i systemowe fonty

W 2021 roku, prawdopodobnie najlepszym wyborem będzie format **WOFF2**. Jest on wspierany przez wszystkie nowoczesne przeglądarki. Dla tych przestarzałych możemy użyć znanego już od lat **WOFF**.

Przed sekundą wspominałem Ci o Google i self-hosted fonts, zapominając trochę o klasycznych fontach typu _web-safe_. Jeśli nie potrzebujesz customowego rozwiązania, zdecydowanie warto postawić na tą opcję:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
```

## Strategie ładowania
