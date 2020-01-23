<h1 id="welcome-to-endpoint-maker">Welcome to Endpoint Maker!</h1>
<p>This File will guide through the steps of creating an Endpoint inside Flow-Backend</p>
<h2 id="step-1">Step 1:</h2>
<p>If you are dealing with the database in the endpoint you will need to make a Controller that interacts with the database inside <code>Controllers</code> Folder <br>
If you are dealing with an external API or any helper function with your endpoint you will need to create a new file that has an expressive name of what it interacts with under <code>helpers</code> Folder then export and add it to the <code>controller</code> in the <code>Controller</code> Folder following this line of code </p>

Helpers/helpersExample.js

<pre><code>module.exports={
    HelperExample: () => console.log(...anything)
};
</code></pre>


Controllers/controllerExample.js
<pre><code>
const HelperExample = require('../Helpers/helpersExample.js')
 console.log(HelperExample.HelperExample)//helper example function
 
</code></pre>


<h2 id="step-2">Step 2:</h2>
<p>After Finishing with the controller and exporting all the functions. We need to require each controllerin its <code>route</code> file under <code>Routes</code> folder 
  
  
  <pre><code>
  module.exports={
    SignUp: (req, res) => res.json(...anything)
};
 
</code></pre>


Routes/routeExample.js
<pre><code> 

  const Controller = require('../controllers')
  Routes.route('/signUp', Controller.SignUp)
  module.exports = router;
  
  </code></pre>
  
  
  
<h2 id="step-3">Step 3</h2>
<p>Test your API using <a href="https://www.getpostman.com/">postman</a> try as many scenarios as you can imagine</p>
