db = db.getSiblingDB('megapersonal');

db.createUser({
    user: "mega-root-admin-personal",
    pwd: "sEcV55Od_G",
    roles: [
        {
            role: "readWrite",
            db: "megapersonal"
        },
        {
            role: "dbAdmin",
            db: "megapersonal"
        }
    ]
});