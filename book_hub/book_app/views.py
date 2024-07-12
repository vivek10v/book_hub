from rest_framework import generics
from .models import User, Book
from .serializers import UserSerializer, BookSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer = UserSerializer
    permission_classes = [IsAdminUser]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer = UserSerializer
    permission_classes = [IsAdminUser]

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer = BookSerializer
    permission_classes = [IsAuthenticated]

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer = BookSerializer
    permission_classes = [IsAuthenticated]
    
class UserView(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("User Added Successfully",          safe=False)
        return JsonResponse("Failed to Add User", safe=False)
    
    def get_user(self, pk):
        try:
            user_detail = User.objects.get(id=pk)
            return user_detail
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_user(pk)
            serializer = UserSerializer(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        user_to_update = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("User updated Successfully", safe=False)
        return JsonResponse("Failed To Update User")
    
    def delete(self, request, pk):
        user_to_delete = User.objects.get(id=pk)
        user_to_delete.delete()
        return JsonResponse("USer Deleted Successfully", safe=False)
    
class BookView(APIView):

    def post(self, request):
        data = request.data
        serializer = BookSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Book Added Successfully",          safe=False)
        return JsonResponse("Failed to Add Book", safe=False)
    
    def get_book(self, pk):
        try:
            book_detail = Book.objects.get(id=pk)
            return book_detail
        except Book.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_book(pk)
            serializer = BookSerializer(data)
        else:
            data = Book.objects.all()
            serializer = BookSerializer(data, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        book_to_update = Book.objects.get(id=pk)
        serializer = BookSerializer(instance=book_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Book updated Successfully", safe=False)
        return JsonResponse("Failed To Update Book")
    
    def delete(self, request, pk):
        book_to_delete = Book.objects.get(id=pk)
        book_to_delete.delete()
        return JsonResponse("Book Deleted Successfully", safe=False)


# def create_book(request):
#     if request.method == 'POST':
#         form = DestinationForm(request.POST, request.FILES)
#         if form.is_valid():
#             try:
#                 form.save()
#                 api_url='http://127.0.0.1:8000/create/'
#                 data=form.cleaned_data
#                 print(data)
                
#                 response = requests.post(api_url, data=data, files={'image':request.FILES['image']})
#                 print(response.status_code)
#                 if response.status_code == 404:
#                     messages.success(request, 'Destination Added')
#                     return redirect('profile')
#                 else:
#                     messages.error(request, f'Error{response.status_code}')
#             except requests.RequestException as e:
#                 messages.error(request, f'Error during API{str(e)}')
#         else:
#             messages.error(request, 'Form is not valid')
            
#     else:
#         form=DestinationForm()
        
#     return render(request, 'profiles/create_destination.html', {'form':form})

# def destination_fetch(request, id):
#     api_url=f'http://127.0.0.1:8000/detail/{id}'
#     response = requests.get(api_url)
#     print(response.status_code)
#     if response.status_code == 200:
#         data =  response.json()
#     return render(request, 'profiles/update_destination.html',{'destination':data})

# def destination_delete(request, id):
#     api_url=f'http://127.0.0.1:8000/delete/{id}'
#     response = requests.get(api_url)
#     print(response.status_code)
#     if response.status_code == 200:
#         print(f'Destion of {id} has been deleted')
#     else:
#         print(f'Failed to delete the destination {response.status_code}')
        
#     return redirect('profile')

# def destination_update(request, id):
#     api_url = f'http://127.0.0.1:8000/update/{id}'
    
#     if request.method == 'POST':
#         form = DestinationForm(request.POST, request.FILES)
#         if form.is_valid():
#             try:
#                 form.save()
#                 data = form.cleaned_data
#                 response = requests.get(api_url, data=data, files={'image': request.FILES['image']})
#                 print(response.status_code)
#                 if response.status_code == 200:
#                     messages.success(request, 'Destination updated successfully')
#                 else:
#                     messages.error(request, f'Failed to update destination. Status code: {response.status_code}')
#             except requests.RequestException as e:
#                 messages.error(request, f'Error during API request: {str(e)}')
#         else:
#             messages.error(request, 'Form is not valid')
#     else:
#         # Fetch existing data from API for the form
#         response = request.GET(api_url)
#         if response.status_code == 200:
#             data = response.json()
#             form = DestinationForm(initial=data)
#         else:
#             messages.error(request, f'Failed to fetch destination details. Status code: {response.status_code}')
#             return redirect('profile')  
    
#     return render(request, 'profiles/update_destination.html', {'form': form, 'id': id})