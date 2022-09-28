var config = new SecurityConfig();
config.client_id = "gamer-net-front";
config.redirect_uri = "http://localhost:4200";
config.scope = "openid profile";
config.grant_type = "authorization_code";
config.response_type = "code";
config.state = "123";
config.code_challenge_method = "S256";
config.code_challenge = "V-4B_G6psjtr8KS22MpFy2HcBBPP4RnAC0E9hofu7K4";
config.code_verifier = "X~i6llNEHRAB380DNonOL6wKFOC5RJlpavW4.KK.yqSj8Vca3PRq0RdhZ0pLYbRYv3ZKB4rOSWmPpb~bzFDlWE84QV6bhxyJ0v6.G32ifdMhX6aO3U4bfHm6jpREvF4Q";
config.client_secret = "zrBckzn7IALW5u7uM3OViN7IuEwKeNRR";
config.post_logout_redirect_uri="http://localhost:4200/welcome";
config.handshake_redirect_uri="http://localhost:4200";
config.sso = "http://localhost:8080/realms/GamerNet/protocol/openid-connect/auth";
config.sso_token = "http://localhost:8080/realms/GamerNet/protocol/openid-connect/token";
config.sso_logout = "http://localhost:8080/realms/GamerNet/protocol/openid-connect/logout";
// logout

config.init();
