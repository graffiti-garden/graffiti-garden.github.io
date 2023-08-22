<template>
  <h1>
    Vue Plugin Reference
  </h1>

  <p>
    The Graffiti plugin for <a href="vuejs.org">Vue.JS</a> inherits from the
    <RouterLink to="/vanilla-js">
      vanilla interface
    </RouterLink>
    and is mostly identitcal. However some methods have been augmented or added
    to take advantage of Vue's reactive features.
  </p>

  <p>
    The plugin can be installed as follows:

    <Playground path="vue-installation-script" :render="false"/>
  </p>


  <p>
    The plugin exposes the
    <a href="https://vuejs.org/api/application.html#app-config-globalproperties">global Vue property</a> <code class="language-js">$graffiti</code> and it's alias
    <code class="language-js">$gf</code>.
    This property can be accessed via <code class="language-js">this.$gf</code> in components or as simply <code class="language-js">$gf</code> Vue templates.
  </p>
  
  <p>
    The following properties of <code class="language-js">$gf</code> are identitcal to their 
    <RouterLink to="/vanilla-js">
      vanilla counterparts</RouterLink>:
    <ul>
      <li>
        <code class="language-js">
          toggleLogIn
        </code>
      </li>
      <li>
        <code class="language-js">
          events
        </code>
      </li>
      <li>
        <code class="language-js">
          post
        </code>
      </li>
      <li>
        <code class="language-js">
          remove
        </code>
      </li>
      <li>
        <code class="language-js">
          objects
        </code>
      </li>
      <li>
        <code class="language-js">
          myContexts
        </code>
      </li>
      <li>
        <code class="language-js">
          media
        </code>
      </li>
    </ul>
  </p>

  <h2>
    Plugin-Specific Variables
  </h2>

  <h3>
    <code class="language-js">
      get me
    </code>
    →
    <code class="language-js">
      <a href="https://vuejs.org/api/reactivity-core.html#reactive">
        Reactive
      </a>Actor URI
    </code>

  </h3>

  <p>
    This is a reactive variation of the vanilla <code class="language-js">gf.me</code>.
    The variable is equal to the user's actor URI if they are logged in and first contact has been made with the Graffiti server.
    The variable is <code class="language-js">null</code> otherwise.
  </p>

  <p>
    Unlike the vanilla version, changes between these states will trigger downstream effects.
    You can use this to change the description of a <code class="language-js">toggleLogIn</code> button, for example.
  </p>

  <Playground path="log-in" />

  <p>
    <code class="language-js">$gf.me</code> may not be defined by the time that <a href="https://vuejs.org/guide/essentials/lifecycle.html">Vue lifecycle hooks</a>
    like <code class="language-js">created</code> and <code class="language-js">mounted</code> are triggered.
    Therefore, if you need to perform some initialization involving <code class="language-js">$gf.me</code>, use a <a href="https://vuejs.org/guide/essentials/watchers.html">Vue watcher</a>.
  </p>

  <Playground path="watchMe" language="js" :render="false"/>

  <h3>
    <code class="language-js">
      get connected
    </code>
    →
    <code class="language-js">
      <a href="https://vuejs.org/api/reactivity-core.html#reactive">
        Reactive
      </a>Boolean
    </code>
  </h3>

  <p>
    This reactive variable simplifies access to the connection status that is available only available in the vanilla API via event listeners.
    When connected to the Graffiti server the variable is true, and false otherwise.
    For example, try turning your WiFi on and off and observing the demo below:
  </p>

  <Playground path="connected" />

  <h3>
    <code class="language-js">
      function useObjects(context)
    </code>
    <br>
    →
    <code class="language-js">
      { objects:<a href="https://vuejs.org/api/reactivity-core.html#reactive">
        Reactive
      </a>Array }
    </code>
  </h3>

  <p>
    This is a <a href="https://vuejs.org/guide/reusability/composables.html">Vue composable</a> wrapper
    around the vanilla async generator <code class="language-js">objects</code> function that makes it
    possible to access Graffiti objects via a reactive array.
    Any references to the reactive array, either in the template or computed properties, will automatically
    update when new objects are added by any user.
    Cleanup is automatically handled when the parent component is destroyed.
  </p>

  <p>
    Since the <code class="language-js">setup</code> function that composables must be used within is called before
    the component is initialized, Graffiti must be <a href="https://vuejs.org/guide/components/provide-inject.html">injected</a> in
    but then can be used as normal.
  </p>

  <Playground path="useObjects" language="js" :render="false"/>

  <p>
    If <code class="language-js">context</code> or any of the URIs within it are reactive or refs,
    the composable will react to their changes.
    If you want to access objects in the context of <code class="language-js">gf.me</code>, you must destructure it with
    <a href="https://vuejs.org/api/reactivity-utilities.html#toref">toRef</a> to retain retain reactivity.
    This looks like: <code class="language-js">$gf.useObjects([Vue.toRef($gf.me)])</code>.
  </p>
</template>