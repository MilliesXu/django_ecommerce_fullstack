from rest_framework import permissions

class ProductPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        elif request.method in ['DELETE', 'PUT']:
            return request.user.is_authenticated and request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        elif request.method in ['DELETE', 'PUT']:
            return request.user.is_authenticated and request.user.is_staff
        else:
            return False