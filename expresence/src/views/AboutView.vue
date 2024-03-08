<template>
  <div id="nav">
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">About</router-link>
  </div>
  
  <div class="about">
    <h1>Expresence</h1>
    <br />
    <h2>What is Expresence</h2>
    <p>This is a web application designed to facilitate co-working at the office and coordinating 
      the attendance of colleagues that wish to meetup at the office. The word "Expresence" is a 
      wordplay on Experis and Presence.
    </p>
    <p>The idea for this web application rose from the hassle of messaging colleagues over Teams 
      for when one will be coming to the office to work together and socialize.
    </p>
    <br />
    <h2>Symbol explanation</h2>
    <h3>Short explanation:</h3>
    <ul>
      <li><span class="gray-dot"></span> : Unknown status. The user hasn't provided any information.</li>
      <li><span class="green-dot"></span> : Attending. The user will be present at the office.</li>
      <li><span class="red-dot"></span> : Absent. The user will not be present at the office.</li>
    </ul>
    <br/>
    <h3>Longer explanation</h3>
    <p>Initially, each person has a gray <span class="gray-dot"></span> status as an unknown state
      of wether the user will be present or absent from the office. By clicking on the gray circle, 
      the color will change from gray to green <span class="green-dot"></span> to indicate that
      the user will be present at the office. The user can click again on the green circle to change
      it to red <span class="red-dot"></span> circle to indicate that they will be absent from the office.
      Notice that once status is changed from gray to green it can only be changed between green and red.</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {

}

#nav {
    padding: 10px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .green-dot {
    height: 10px;
    width: 10px;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
    border-color: #7ad668;
    box-shadow: 0px 0px 4px 1px #94E185;
}

.red-dot {
    height: 10px;
    width: 10px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    border-color: #ed0c22;
    box-shadow: 0px 0px 4px 1px #706e6e;
}

  .gray-dot {
    height: 10px;
    width: 10px;
    background-color: gray;
    border-radius: 50%;
    display: inline-block;
    border-color: #d6d1d2;
    box-shadow: 0px 0px 4px 1px #f4f2f2;
}

li {
  list-style: none;
}

p {
  max-width: 1024px;
  font-size:large;
}
</style>
