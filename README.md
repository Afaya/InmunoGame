# InmunoGame
InmunoGame es un juego diseñado y realizado por Afaya en el que mediante Javascript of Things crearemos un trivial inmunológico interactivo con el cual los niños inmunodeprimidos pueden aprender mas sobre Inmunología. El juego consiste en una caja en la cual se encuentra un Raspberry Pi, tiene botones para: siguiente pregunta, respuesta A, B y C y leds indicadores de respuesta acertada o incorrecta. Además la pregunta y la respuesta correcta se leen mediante text to speech con un altavoz. 

Para este desarrollo valoramos utilizar Jhonny Five pero finalmente utilizamos GPIO con la librería onoff. Para el text to speech valoramos utilizar Festival pero finalmente implementemos TTS Pikospeak. 

InmunoGame además tiene otra parte, y es que incorpora dos sensores, uno de humedad y temperatura (DHT) y otro para partículas en suspensión(SDS011). Con ambas mediciones calculamos unos algoritmos de riesgo de contraer el virus de la gripe o de sufrir un ataque de alergia por ácaros o polvo y se muestran mediante una aplicación Angular en el móvil de los padres, así estos pueden tener la confianza de que las condiciones de la habitación de sus hijos son las adecuadas y además se les muestran unos gráficos con el histórico de las alertas.

Para esta parte realizamos un servidor en Node, creamos una base de datos en MariaDB y una aplicación Angular que se nutre de estos campos. En el servidor Node para acceder a los sensores utilizamos las librerías mmm-usonic y sds-011-client. La aplicación Angular está realizada con la versión 8, que muestra datos y utiliza para los gráficos Chart.Js. Además el login se realiza tanto en back como en front con JWT y los test los realizamos en Node con Mocha y Supertest y en Angular con Karma. Lo servimos todo desde la Raspberry Pi.

El paso a paso se encuentra dentro de la carpeta Documents. 
