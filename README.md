# labofolio

## features

- 나만 이해하게 적음.. ㅇㅇ

## tree & architecture

- index.js
- shared
    - config
        - local
        - prd
    - constant
    - environment
    - services
- core
    - middleware
    - context
    - application [parent]
- mode [child]
    - chat-api
        - routes
    - app-api
        - routes
    - web-api
        - routes
    - web
        - routes
- tools
    - locale
        - ko
        - en
        - ja
        - etc
    - test
    - mysql [sequelize base]
        - models
        - init_models
        - init_data
- utils
    - error handler
    - parser

## TODO

- [x] async init function ?
- [x] sample ddl
- [x] oas3
- [x] init data
- [ ] mocha
- [x] i18next
- [x] log
- [x] http header
- [x] monitoring
- [ ] versioning
- [ ] last refactoring before [NEXT Mission]

## NEXT Mission

- [ ] lodash
- [ ] mout
- [ ] utils single package
- [ ] core single package
- [ ] fix architecture