exports=function ConnectDB() {

    console.log("in");
    //Set up default mongoose connection

    var mongoDB = 'mongodb://localhost:27017/demoDb';
    mongoose.connect(mongoDB);
    // var db = mongoose.connection;
    mongoose.connection.on('open',function() {
        console.log(console, 'Successful:');
    });

    mongoose.connection.on('error', function() {
        console.error.bind(console, 'MongoDB connection error:')
    });
}  