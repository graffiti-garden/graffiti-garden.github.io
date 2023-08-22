<template>
  <h1>
    Overview
  </h1>

  <p>
    Graffiti is a social media backend or "architecture"
    that various social media front-ends or "applications" can be built on top of.
    Graffiti is designed so that many different applications can operate and inter-operate on top of it simultaneously.
  </p>

  <p>
    Graffiti's imagines social media as an vast sea of data objects that includes posts, comments, likes, profile information, and friend/follower relationships among other things.
    An application is like a fishing boat that ventures out onto this sea to catch objects of interest to the user, such as posts made by their friends, messages they've received and comments in a thread they are reading, 
    and then returns to process these objects into a coherent display like a "timeline".
  </p>

  <figure>
    <img src="/media/sailboat.png"/>
    <figcaption>
      An application ventures out on the sea of data.
    </figcaption>
  </figure>

  <p>
    Applications built upon such an architecture naturally inter-operate because, regardless of how they process objects, the applications are all fishing their objects from the same sea.
    However, to make this otherwise lawless high sea a viable medium for healthy social interactions, we need to address how it can be <em>moderated</em>
    and how it can enable users to maintain <em>contextual boundaries</em>.
    <!--However, there are two critical challenges that need to be addressed: deciding how the Graffiti sea should be governed and deciding how social boundaries can be maintained.-->
  </p>

  <p>
    Moderation across existing social applications varies widely based on the needs and values of the communities each app is designed to serve.
    Depending on the application, whether one user is allowed to delete another user's post can depend on whether that user is a moderator, whether a jury of their peers agrees with them, or whether an AI analysis of the post flags it as harmful.
    <!--Which rules of governance should be applied when -->
    <!--one user wants to modify or delete an object created by another user?-->
    <!--Based on the values and cultures the systems are trying to support only grant the prilege to chosen moderators, others use democratic processes, AI, none at all-->
    <!--The need for some sot of rules is apparent in the case of moderatio-->
    <!--but conversely that absence of strict rules is important for frictionless collaboration in, say, a Google Doc.-->
    Rather than choosing a one-size-fits-all moderation system,
    Graffiti employs <a href="https://en.wikipedia.org/wiki/Reification_(computer_science)"><em>reifification</em></a> so that deleting an object, for example, does not actually delete the object but rather creates a <em>new</em> object representing a delete action.
    Each application can then interpret these actions with whatever moderation rules it would like.
  </p>

  <p>
    Contextual boundaries separate out social spaces with different norms and audiences.
    These can be strict like the boundaries that surround private conversations or fuzzy like the boundary surrounding Black Twitter.
    In either case, when communication intended for one context crosses into another
    it can cause misunderstanding and toxic conflict as part of the broad phenomenon of <a href="https://en.wikipedia.org/wiki/Context_collapse">context collapse</a>.
    Defending against this collapse is especially critical if
    <em>all the social data</em> from <em>all applications</em> is being poured into the same sea.
    Therefore, Graffiti enables context management as a first-class property.
  </p>

  <figure>
    <img src="/media/context_collapse.png" />
    <figcaption>
      Chaos ensues when contexts collapse.
    </figcaption>
  </figure>

  <p>
    In Graffiti, object creators must assign their objects to "contexts," which may be anything that can be represented by a link, including abstract places like the context of "my profile" or "the comment thread."
    Only applications that query for the specific context(s) assigned to an object will be able to find it.
    To simulate a Twitter comment, that comment would be assigned to both the context of "my profile" and "the coment thread"; an Instagram comment (<a href="https://www.buzzfeednews.com/article/katienotopoulos/instagrams-following-activity-tab-is-going-away">since 2019</a>) would only be assigned to "the comment thread"; and a Quote Tweet would only be assigned to "my profile".
    Since moderation is reified, 
    there are no inherent rules governing what is or isn't allow in any context.
  </p>

  <p>
    Graffiti can be summarized by the following axioms:
  </p>

  <ol>
    <li>
      Users can create "objects," representing social data or actions.
    </li>
    <li>
      Users can modify or delete objects that they have created but not those that others have created.
    </li>
    <li>
      Users can mark an object that they have created as public or limit access to a set of users.
    </li>
    <li>
      Users can associate their objects with "contexts," represented by any URL or URI.
    </li>
    <li>
    Users can query a context to find all objects associated with it, including all objects created by other users that they have access to.
    </li>
    <li>
    No user can prevent another user from associating an object with a particular context; contexts are not owned.
    </li>
  </ol>

  <!-- <footer>
    <RouterLink to="/introduction">
      Introduction
    </RouterLink>
  </footer> -->

  <!--With Mastodon, your identity is tied to a server but your moderation and "community" are also tied to that server.-->
  <!--While you can move your data from one server to another, you lose your identity and break connection people had to you or things you've created.-->
  <!--Uses duck typing.-->
    <!--Users and objects have identities.-->
    <!--Implictly have own access-->
    <!--Id is implicit-->
    <!--This all happens live.-->
</template>