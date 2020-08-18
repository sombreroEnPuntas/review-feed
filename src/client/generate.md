# Swagger UI codegen

1. go to https://editor.swagger.io/#/
2. load [src/client/swagger.json](src/client/swagger.json)
3. go to `generate client >> typescript fetch`
4. copy to `src/client` folder the following:

```
api.ts
configuration.ts
custom.d.ts
```

5. lint & fix
6. monkey patch the [url package error](https://github.com/swagger-api/swagger-codegen/issues/6403#issuecomment-455187136)!
7. type fixing `api.ts`: the responses are _snake_case_

- interface ModelReview

```
 created_at?: string
```

- interface ModelReviewTheme

```
 theme_id?: number
```
