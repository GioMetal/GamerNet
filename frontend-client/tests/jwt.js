import {JWTTOKEN} from '../classes/jwttoken.js'


const jwtString = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJoZDY3U2dpYnhNamg1VGg3TWk1ZFFZUTFXQ2hCeFI5OUFqYlJ5Y3lCdU93In0.eyJleHAiOjE2NjE1MjQxNTEsImlhdCI6MTY2MTUyMzg1MSwianRpIjoiMmQyM2NjZDgtNmM0ZS00YWE1LThmMTctZDIzZDgzNmNjNjJmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9HYW1lck5ldCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIwNGE0YzNkNi1iZjIxLTQwNTQtOTBmYi0yM2Q0MzUzNDg4ODYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnYW1lci1uZXQtZnJvbnQiLCJzZXNzaW9uX3N0YXRlIjoiMTgyZmY0YjYtNGU2OC00ZDAzLWE3ZWQtNmMwZTljY2JlZGRkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtZ2FtZXJuZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImdhbWVyLW5ldC1mcm9udCI6eyJyb2xlcyI6WyJhcHByb3ZlZCJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjE4MmZmNGI2LTRlNjgtNGQwMy1hN2VkLTZjMGU5Y2NiZWRkZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXVybyIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.Ywfca9DhkmFpSSYHp7Z_jm79JouaInQ5_Su760OLV4U3UmpOYE1bxa4WH0id51jC79nAfUjv3nl4ANV0-SUSeaoodnDfTydpPsbs3CSIeY0yI8_qUNzcU4A9ZnIg8ANLmCUWWnqlg1gdaqEmhqH6JC3qzIcmcgnLR3KzA4oKxqLWkAZiIMeEO-zPFyKhXNgwmhhuN9umBVgQUsryJpMDahzkyuXXvJR9IOWVKlGGBr-aqv3g0iPl_pAgD1y8P44Y5br613dwgKW6zxeJp9SfL5P9bX_UZv8sDrEnjzJ6c70mXjA-FoS4qHipFLJjHdtq6nRg-SphQe56O8kNNkRcMw";
let token = new JWTTOKEN(jwtString);
token = JWTTOKEN.verify(token);

console.log('Your roles:')
console.log(token.getAuthority());
