"use strict";
{
    C3.Plugins.<%= id %>.Type = class MyType extends C3.SDKTypeBase
    {
        constructor(objectClass)
        {
            super(objectClass);
        }

        Release()
        {
            super.Release();
        }

        OnCreate()
        {}
    };
}