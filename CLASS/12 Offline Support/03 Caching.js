/*
When we fetch api data, we want to store the success response data locally on the mobile device so if the device goes offline, we can read the data from the cache...

Various Options available : -
1)  AsyncStorage : - This is the localStorage we have on web, its not encrypted so we should not store sensitive data here and its limited to 6mb capacity..
2)  SecureStore : - This is an api built by the expo team, this is capped at 2mb..
3)  SQLite : - This gives us a lightweight sql database on our database.. Useful for querying data with SQL queries..

NOTE : -  With all this options, the query is available across app restarts and get wiped when we uninstall the app
*/
