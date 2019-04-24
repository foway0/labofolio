# labofolio

## tree & architecture

- index.js
- shared
    - config
        - local
        - prd
    - constant
    - environment
    - locale
        - ko
        - en
        - ja
        - etc
- core
    - middleware
    - context
    - application [parent]
    - error handling
- mode [child]
    - chat-api
        - routes
        - services
    - app-api
        - routes
        - services
    - web-api
        - routes
        - services
    - web
        - routes
        - services
- tools
    - test
    - models [sequelize base]
        - mysql
    - insert-data