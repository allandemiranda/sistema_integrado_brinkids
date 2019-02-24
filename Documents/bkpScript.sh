#! /bin/bash
diretorio=$HOME/backup/sistema_$(date +%d-%m-%Y_%H-%M)
mkdir $diretorio
cd $diretorio
mongodump
cp -r $HOME/sistema_integrado_brinkids/express-brinkids/public $diretorio
