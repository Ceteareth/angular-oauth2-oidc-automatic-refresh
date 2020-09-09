// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace is4
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("scope1"),
                new ApiScope("scope2"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "codeClient",
                    
                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = { "http://localhost:4200" },
                    PostLogoutRedirectUris = { "http://localhost:4200" },
                    AllowedCorsOrigins = {"http://localhost:4200"},
                    RequireClientSecret = false,

                    RefreshTokenUsage = TokenUsage.OneTimeOnly,

                    RequireConsent = false,

                    AccessTokenLifetime = 60,

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "offline_access" }
                },
            };
    }
}