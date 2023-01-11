FROM mongo

COPY init.json /init.json

# https://docs.mongodb.com/database-tools/mongoimport/
# Drop and import collection
CMD mongoimport --uri mongodb://root:prisma@angelondb_migrate:27017/angelondb?authSource=admin --drop --collection users --type json --file /init.json --jsonArray
