from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def leads(request):
    fake_leads = {
        "leads": [
            {
                "name": "Example Dental",
                "website": "https://example.com",
                "city": "Mexico City"
            },
            {
                "name": "Smile Clinic",
                "website": "https://example.org",
                "city": "Mexico City"
            }
        ]
    }
    return JsonResponse(fake_leads)
