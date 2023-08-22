<template>
  <h1>
    Vanilla JS Reference
  </h1>

  <p>
    Graffiti can be used with vanilla javscript via the following interface.

    <Playground path="vanilla-installation-script" :render="false"/>
  </p>

  <h2 id="constructing">
    Constructing
  </h2>

  <h3>
    <code class="language-js">
      new Graffiti(options)
    </code>
  </h3>

  <p>
    The constructor establishes a connection to the <a href="https://github.com/graffiti-garden/graffiti-server">Graffiti server</a> and exposes the API described below.
    As of this time, the only property that can be passed into the the optional
    <code class="language-js">options</code> object is <code class="language-js">url</code>,
    which specifies the URL of the Graffiti server.
    If no URL is specified, the constructor
    will connect with the global server at <a href="https://graffiti.garden">graffiti.garden</a>.
  </p>

  <h2 id="connecting">
    Connecting
  </h2>

  <h3>
    <code class="language-js">
      function toggleLogIn()
    </code>
  </h3>
  <p>
    This function toggles the login state of the user: if the user is logged out, they are logged in; if the user is is logged in, they are logged out.
  </p>

  <h3>
    <code class="language-js">
      get me
    </code>
    →
    <code class="language-js">
      ActorURI
    </code>
  </h3>

  <p>
    This variable is equal to a user's ID if the user is logged in and connected to the server and <code class="language-js">null</code> otherwise.
    The is ID is a URI is referred to as an "actor" URI in alignment with <a href="https://www.w3.org/TR/activitypub/#actors">ActivityPub specification</a>.
  </p>

  <h3>
    <code class="language-js">
      get events
    </code>
    →
    <code class="language-js">
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget">
        EventTarget
      </a>
    </code>
  </h3>

  <p>
    This EventTarget emits a
    <code class="language-js">"connected"</code> event when the interface establishes a connection with the server,
    and a <code class="language-js">"disconnected"</code> event when the interface loses connection with the server,
    for example when a WiFi connection is broken.
    In a connected state, the
    <code class="language-js">toggleLogIn()</code> function may be called,
    and the <code class="language-js">me</code> variable will be equal to the user's actor URI if that user is logged in.

    <Playground path="events" language="js" :render="false"/>
  </p>


  <h2 id="reading-and-writing">
    Reading and Writing
  </h2>

  <h3>
    <code class="language-js">
      function post(object)
    </code>
    →
    <code class="language-js">
      GraffitiObject
    </code>
  </h3>

  <p>
    This function adds a JSON object to the Graffiti server.
    It returns a <code class="language-js">GraffitiObject</code> proxy,
    which includes all the properties of the input object.
    Any modifications to this proxy will automatically be synced with the server.
    Additionally, the proxy is augmented with the following properties:
  </p>

  <ul>
    <li>
      <code class="language-js">id</code>
      is a unique identifier associated with each Graffiti object.
    </li>
    <li>
      <code class="language-js">actor</code>
      is a unique identified associated with each user and also attached to each object.
    </li>
    <li>
      <code class="language-js">published</code>
      and
      <code class="language-js">updated</code>
      specify when an object was created and when it was last updated.
    </li>
  </ul>

  <p>
    Most properties of the input object can be any serializable JSON and have no functional meaning to the server.
    The following properties are the exceptions:
  </p>

  <ul>
    <li>
      <code class="language-js">context</code>
      is an array of uniform resource identifiers that specify "where" an object can be found.
      This field <strong>must</strong> be included in the input object and contain at least one URI.
    </li>
    <li>
      <code class="language-js">bto</code>
      and
      <code class="language-js">bcc</code>
      specify who is allowed to retrieve an object via an array of actor URIs.
      These properties are <strong>optional</strong>.
      If neither property is included, the object is public.
      If one or both of the properties are included but no actor URIs are included in either array,
      the object can only be seen by it's creator
    </li>

  </ul>

  <h3>
    <code class="language-js">
      function remove(...graffitiObjects)
    </code>
  </h3>

  <p>
    This function removes one or more graffiti objects from the server.
    Note that you can only remove objects from the server that you have created
    or equivalently objects whose <code class="language-js">actor</code> property is equal to <code class="language-js">gf.me</code>.
    For justification on why we chose this model, see the <RouterLink to="/overview">Overview</RouterLink>
  </p>

  <h3>
    <code class="language-js">
      async *function objects(context, <a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal">AbortSignal</a>)
    </code>
    <br>
    →
    <code class="language-js">
      GraffitiObject
    </code>
  </h3>

  <p>
    This is an asynchronous generator used to retrieve Graffiti objects from the server.
    <code class="language-js">context</code> must be an array of URIs like the <code class="language-js">context</code> property of each <code class="language-js">GraffitiObject</code>.
    Any object with a <code class="language-js">context</code> that <strong>intersects</strong> the <code class="language-js">context</code> passed to this generator will be returned, subject to the <code class="language-js">bto</code> and <code class="language-js">bcc</code> access constraints described above.
  </p>

  <p>
    If an object is deleted from the server, the generator will return an object that only contains the <code class="language-js">id</code> of the deleted object.
    The generator will continue to stream Graffiti objects as they are added to the server until it receives an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal">AbortSignal</a>.
    For example:
  </p>

  <Playground path="objects" language="js" :render="false"/>

  <h3>
    <code class="language-js">
      async myContexts()
    </code>
  </h3>

  <p>
    This function returns a list of all contexts the user has ever posted in.
  </p>

  <h2 id="media-uploads">
    Media Uploads
  </h2>

  <p>
    Media in Graffiti is not stored in the server but instead served peer-to-peer over <a href="https://en.wikipedia.org/wiki/WebTorrent">WebTorrents</a>.
    You act as the server or <a href="https://en.wikipedia.org/wiki/Seeding_(computing)">seed</a> of your own files and any one who views your files also becomes a seed.
  </p>

  <p>
    This approach means there is no prescribed limit to the number or size of files you want to share since you are the one responsible for hosting them.
    The downside is that your media files can go offline when there are no seeders online.
    We're in the process of creating a <a href="https://en.wikipedia.org/wiki/Seedbox">seedboxes</a> for Graffiti content,
    but for now this is simply a limitation of alpha-stage software.
  </p>

  <h3>
    <code class="language-js">
      async media.store(<a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>)
    </code>
    →
    <code class="language-js">
      <a href="https://en.wikipedia.org/wiki/Magnet_URI_scheme">magnet URI</a>
    </code>
  </h3>

  <p>
    This asynchronous function takes as input a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File</a>
    and returns a corresponding <a href="https://en.wikipedia.org/wiki/Magnet_URI_scheme">magnet URI</a>.
    The magnet URI can be used to download the file on other Graffiti instances or in a standard Webtorrent client like <a href="https://webtorrent.io/desktop/">Webtorrent desktop</a>.
  </p>

  <p>
    The media will be cached in local storage and will reseed any time Graffiti is active at the same domain.
  </p>

  <Playground path="media-store" :render="false"/>

  <h3>
    <code class="language-js">
      async media.fetch(<a href="https://en.wikipedia.org/wiki/Magnet_URI_scheme">magnet URI</a>)
    </code>
    →
    <code class="language-js">
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>
    </code>
  </h3>

  <p>
    This function fetches media from a magnet URI and returns a Blob once it is fully downloaded.
    It will also seed a copy of the fetched media that persists in local storage just like with <code class="language-js">store</code>.
    If this function is called multiple times, the file is
    only actually downloaded once to preserve bandwidth.
  </p>

  <p>
    If the function is passed an invalid magnet URI
    it will throw an error. So if you're getting magnet URIs from some user-generated source make sure to wrap the fetch in a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch">try...catch</a>.
  </p>

  <h3>
    <code class="language-js">
      async media.fetchURL(<a href="https://en.wikipedia.org/wiki/Magnet_URI_scheme">magnet URI</a>)
    </code>
    →
    <code class="language-js">
      URL
    </code>
  </h3>

  <p>
  To display the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a> returned by <code class="language-js">gf.media.fetch</code> in any media tags, like <code class="language-html">&lt;img></code>, the Blob needs to be converted to a URL that can be passed to the <code class="language-htm">src</code> attribute.
    This can be done with <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL">URL.createObjectURL</a>, but this requires an extra step and will create a new URL every time it is called.
  </p>

  <p>
    The function <code class="language-js">gf.media.fetchURL</code> simplifies this logic and will return the same URL every time it is called.
    For example:
  </p>

  <Playground path="media-fetch" :render="false"/>
</template>