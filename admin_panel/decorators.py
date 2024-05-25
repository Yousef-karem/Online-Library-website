from django.shortcuts import redirect
from django.contrib.auth import logout

def admin_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.isAdmin:
            return view_func(request, *args, **kwargs)
        else:
            logout(request)
            return redirect('signin')
    return _wrapped_view