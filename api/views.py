from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import CustomUser
from .serializer import LoginSerializer, UserSerializer


class UserViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserCreateAPIViewSet(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(user.password)
        user.save()

class LoginUserViewSet(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')

        try : 
            user = CustomUser.objects.get(email=email)

            if user.check_password(password):
                login(request, user)
                return Response({'user': UserSerializer(user, context=self.get_serializer).data})
            else:
                print("パスワードが違う！！")


        except CustomUser.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
