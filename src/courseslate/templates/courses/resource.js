<a href="{{ url }}" class="resource-url">{{ url }}</a>
<h5>{{ title }}</h5>
<div class="info-line">
Created {{ created }} 
{{#if updated}}
 Updated {{ updated }}
{{/if}}

 By <a href="/user/{{ person.user.username }}">{{ person.user.username }}</a>

</div>

