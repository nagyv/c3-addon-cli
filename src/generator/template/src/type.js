"use strict";
{
    const PLUGIN_CLASS = SDK.Plugins.<%= id %>;

    PLUGIN_CLASS.Type = class MyType extends SDK.ITypeBase
    {
        constructor(sdkPlugin, iObjectType)
        {
            super(sdkPlugin, iObjectType);
        }
    };
}