<h5>{{ title }}</h5>
<p>{{ comment }}</p>
<div class="info-line">
Created {{ created }} 
{{#if updated}}
 Updated {{ updated }}
{{/if}}

 By <a href="/user/{{ person.user.username }}">{{ person.user.username }}</a>

</div>
