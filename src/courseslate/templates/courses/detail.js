<h3>{{ title }}</h3>
<p>{{ description }}</p>
<div class="tags-group">
    {{#each tags}}
        {{name}}
    {{/each}}
</div>
<div class="info-line">
Created {{ created }} 
{{#if updated}}
 Updated {{ updated }}
{{/if}}

 By <a href="/user/{{ person.user.username }}" class="nav-link">{{ person.user.username }}</a>

</div>
