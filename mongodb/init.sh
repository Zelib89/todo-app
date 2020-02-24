#!/bin/bash

set -e
set -u

mongo <<EOF
use $DB_NAME;
db.createUser({
  roles: [{
    db: '$DB_NAME',
    role: 'readWrite',
  }],
  pwd: '$DB_PASSWORD',
  user: '$DB_USERNAME',
});
EOF