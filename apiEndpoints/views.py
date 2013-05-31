# Create your views here.
from django.core.serializers.json import simplejson as json, DjangoJSONEncoder
from django.http import HttpResponse
from django.template.loader import render_to_string
from django_remote_forms.forms import RemoteForm
from django.middleware.csrf import CsrfViewMiddleware
from django.views.decorators.csrf import csrf_exempt

from courses.forms import TopicForm, UpdatesForm, TopicResourceForm

def get_logged_in_user(request):
    if request.is_ajax():
        current_user = request.user.username
        response = {"user":current_user}
        return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        return HttpResponse(json.dumps({'error':'ajax required'}), content_type="application/json")

def get_topic_form(request):
    if request.is_ajax():
        form = {'form':TopicForm()}
        template = 'courses/topic_create.html'
        response = {"form_html":render_to_string(template, form)}
        return HttpResponse(json.dumps(response), content_type="application/json")
    else:
        return HttpResponse(json.dumps({'error':'ajax required'}), content_type="application/json")

@csrf_exempt
def json_topic_form(request):
    csrf_middleware = CsrfViewMiddleware()

    response_data = {}
    if request.method == 'GET':
        form = TopicForm()
    elif request.raw_post_data:
        request.POST = json.loads(request.raw_post_data)

        csrf_middleware.process_view(request, None, None, None, None)
        form_data = request.POST.get('data', {})
        form = TopicForm(form_data)
        if form.is_valid():
            form.save()

    remote_form = RemoteForm(form)

    response_data.update(remote_form_as_dict())

    response = HttpResponse(json.dumps(response_data, cls=DjangoJSONEncoder), mimetype='application/json')

    csrf_middleware.process_response(request, response)
    return response;
