<a href="/user/{{ person.user.username }}/course/{{ slug }}" class="nav-link">{{ title }}</a>
<p>{{ description }}</p>
<div class="info-line">
Created {{ created }} 
{{#if updated}}
 Updated {{ updated }}
{{/if}}

<span class="user-link">By <a href="/user/{{ person.user.username }}" class="nav-link">{{ person.user.username }}</a></span>

</div>
