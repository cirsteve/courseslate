{{ user.username }}
<div class="info-line">Joined {{ user.date_joined }} Last login {{ user.last_login }}</p>
<div class="stats-line">Courses: <span id="courseCount">-</span> Resources: <span id="resourceCount">-</span></div>
<p>{{#if bio }} {{ bio }} {{else }} No Bio{{/if}}</p>
