### Creamos el Curl para registar un usuario

 curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{
    "username": "juan",
    "email": "juan@example.com",
    "password": "Password123@"
  }'


  curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123@"
  }'


  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODM5NDQ3NzkwMjc3MWZhNjM4M2MxYyIsInVzZXJuYW1lIjoianVhbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMjQxMDEyLCJleHAiOjE3NzAzMjc0MTIsImlzcyI6ImN1cnNvLXV0bi1iYWNrZW5kIn0.iUanNprLrMdviWqbmZR9wLmln3GOdPFvIq-eKhVuQR8

### Ruta protegida que necesito token(funciona)

  curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODM5NDQ3NzkwMjc3MWZhNjM4M2MxYyIsInVzZXJuYW1lIjoianVhbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMjQxMDEyLCJleHAiOjE3NzAzMjc0MTIsImlzcyI6ImN1cnNvLXV0bi1iYWNrZW5kIn0.iUanNprLrMdviWqbmZR9wLmln3GOdPFvIq-eKhVuQR8"



### ahora sigo siendo user y no me permite entrar ya que solo puede entrar admin 

  curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODM5NDQ3NzkwMjc3MWZhNjM4M2MxYyIsInVzZXJuYW1lIjoianVhbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMjQxMDEyLCJleHAiOjE3NzAzMjc0MTIsImlzcyI6ImN1cnNvLXV0bi1iYWNrZW5kIn0.iUanNprLrMdviWqbmZR9wLmln3GOdPFvIq-eKhVuQR8"










###  vamos a crear otro usuario que lo vamos a modificar en la base de datos para que sea admin 

   curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{
    "username": "ignacio",
    "email": "igju@example.com",
    "password": "12345IG@"
  }'

  Vamos a la base de datos y le cambiamos el rol a admin 
  ahora nos volvemos a loguear

  curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "igju@example.com",
    "password": "12345IG@"
  }'

###  nos devuelve un token 

  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA

  curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA"

  curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA"











###  vamos a crear 3 productos 

  curl -X POST http://localhost:3000/api/producto/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA" \
  -d '{
    "name": "Producto A",
    "description": "Descripción breve",
    "price": 199.99,
    "stock": 10
  }'


    curl -X POST http://localhost:3000/api/producto/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA" \
  -d '{
    "name": "Producto B",
    "description": "Descripción breve",
    "price": 200.99,
    "stock": 5
  }'


    curl -X POST http://localhost:3000/api/producto/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA" \
  -d '{
    "name": "Producto C",
    "description": "Descripción breve",
    "price": 800.90,
    "stock": 9
  }'


###  vamos a tratar de modificar un producto necesitamos su id y Bearer 
  curl -X PUT http://localhost:3000/api/producto/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Producto C actualizado",
    "description": "Descripción actualizada",
    "price": 750.00,
    "stock": 8
  }'



  curl -X PUT http://localhost:3000/api/producto/6983f911e1d02fc052f5fb3c \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA" \
  -d '{
    "name": "Producto C actualizado",
    "description": "Descripción actualizada",
    "price": 750.00,
    "stock": 8
  }'



###  VAMOS A PROBAR EL DELETE 
  curl -X DELETE http://localhost:3000/api/producto/<PRODUCT_ID> \
  -H "Authorization: Bearer $TOKEN"

  VAMOS A TRATAR DE ELIMINAR EL SEGUNDO PRODUCTO

    curl -X DELETE http://localhost:3000/api/producto/6983f8f9e1d02fc052f5fb38 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODNkYWI4YmM0ZWNhNjdlN2E0OTU2YiIsInVzZXJuYW1lIjoiaWduYWNpbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDI0OTAyMSwiZXhwIjoxNzcwMzM1NDIxLCJpc3MiOiJjdXJzby11dG4tYmFja2VuZCJ9.gJzTRJWZraHQKdKfBxaO6eakDFMxngw7EU0kSjjhuqA"

###  BUENO EL CURL FUNCIONA MASO MENOS