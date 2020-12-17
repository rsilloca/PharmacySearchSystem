node{
    def SOURCEDIR = "FarmaciaFront"

    stage("Pull Git") {
        checkout scm
    }


    stage("Build Angular") {

        dir(SOURCEDIR){
            sh 'sudo ng build --prod'
            sh 'sudo mv -v /dist/* /var/www/html/farmacia/'

        }
    }
}
