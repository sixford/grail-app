from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import ItemSerializer
from rest_framework.exceptions import ValidationError, NotFound


from .models import Item

class ItemIndexView(APIView):

    # ! Path: /api/records

    # Inside, we define class methods for allowed REST METHOD endpoints
    # So for the "get()" method below, any GET request hitting this view would execute this method

    # Endpoint: GET /api/item
    def get(self, request):

        # Model.objects.all() is a model manager and returns back all objects from a model (records from a table) as a QuerySet
        all_item = Item.objects.all()
        print('ALL ITEMS ->', all_item)
        
        # This QuerySet is not JSON Serializable, so we need to Serialize it into a Python Data type
        # Don't forget, if you use .all(), then you need to add many=True otherwise you will get an error
        serialized_item = ItemSerializer(all_item, many=True)
        # The return value from instantiating a Serializer Class is an object containing a python dictionary on the .data key
        # below, running serialized_records.data prints a dictionary of key value pairs from our QuerySet
        print('SERIALIZED ITEMS ->', serialized_item.data)

        # Once it's been serialized, it's not JSON serializable. So we return the .data key back to the client
        return Response(serialized_item.data)
    
    # Endpoint: POST /api/shoes
    def post_as_exceptions(self, request):
        print('REQUEST DATA ->', request.data)
        try:
            # So we first pass request.data (client request body) into our Serializer under the data argument
            # This will start to deserialize the data to convert from Python back to complex type for adding to DB
            serialized_item = ItemSerializer(data=request.data)
            # Whenever we deserialize (create or update) we run .is_valid() which validates the data based on the model we have specified
            # trying to save before validating will always fail
            serialized_item.is_valid(raise_exception=True)
            # Once validated, serialized_record.validated_data is now available and so we can now save our new object
            serialized_item.save()
            # Once saved, we have access to the data key on the serializer, which contains our updated data. 
            # Send this back to the user in the response
            return Response(serialized_item.data, status=201)
        
        except ValidationError as e:
            print(e)
            res = e.__dict__ if e.__dict__ else str(e)
            return Response(res, status=422)
        except Exception as e:
            print('Exception type ->', type(e))
            print('Exception ->', e)

            # truthy if condition else falsey
            res = e.__dict__ if e.__dict__ else str(e)

            return Response(res, status=500)
        
    

    def post(self, request):
        try:
            # Add our data to be serialized
            serialized_item = ItemSerializer(data=request.data)
            
            # Validate the data, saving and returning saved data if .is_valid() returns True
            if serialized_item.is_valid():
                serialized_item.save()
                return Response(serialized_item.data, status=201)
            
            # If is_valid() returned false, return 422 with errors
            return Response(serialized_item.errors, status=422)
        
        except Exception as e:
            return Response(e.__dict__ if e.__dict__ else str(e), status=500)



class ItemDetailView(APIView):

    # ! Path: /api/shoes/<int:pk>/
    # Helper methods
    def get_item(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist as e:
            print(e)
            print(type(e))
            raise NotFound(str(e))

    # RESTful methods
    def get(self, request, pk):
        item = self.get_item(pk)
        serialized_item = ItemSerializer(item)
        return Response(serialized_item.data)



    def put(self, request, pk):
        item = self.get_item(pk)
        serialized_item = ItemSerializer(instance=item, data=request.data, partial=True)
        if serialized_item.is_valid():
            serialized_item.save()
            return Response(serialized_item.data)
        else:
            return Response(serialized_item.errors, status=422)

    
    def delete(self, request, pk):
        item = self.get_item(pk)
        item.delete()
        return Response(status=204)