from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Product-related API endpoints
    path('api/products/', include('base.urls.product_urls')),

    # User-related API endpoints
    path('api/users/', include('base.urls.user_urls')),

    # Order-related API endpoints
    path('api/orders/', include('base.urls.order_urls')),
]

# Serve media files in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
