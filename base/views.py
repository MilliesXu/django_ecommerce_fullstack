from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class Base(APIView):
    permission_classes = []

    def get(self, sender, **kwargs):
        routes = [
            'GET /api/products/',
            'GET /api/products/<id>',
            'POST /api/products/',
            'PUT /api/products/<id>',
            'DEL /api/products/<id>',
        ]

        return Response(routes)
