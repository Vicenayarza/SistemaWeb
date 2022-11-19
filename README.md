# Sistema Web: Buscando Estrellas

## Integrantes del grupo:

- Vicente Ayarza Ocejo
- Unai Castro Martínez

## Método de despliegue del proyecto

Situar la terminal dentro de la carpeta SistemaWeb.

Descargar docker:
```bash
$ sudo apt-get install docker
```

Crear la imagen web:
```bash
$ sudo docker build -t="web" .
```

Iniciar los contenedores:
```bash
$ sudo docker-compose up -d
```

Mediante un navegador, acceder a http://localhost:8890/ . 

Iniciar sesión con usuario *admin* y contraseña *test*. 

Hacer click en *database* y luego *import* o *importar* y finalmente, *Seleccionar archivo*, donde elegiremos el archivo *SistemaWeb/database.sql*.

Acceder a http://localhost:81/ .

En caso de querer detener el proyecto, en otra terminal:
```bash
$ sudo docker-compose down
```
