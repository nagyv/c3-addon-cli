"use strict";
{
    C3.Plugins.<%= id %>.Instance = class MyInstance extends C3.SDKInstanceBase
    {
        constructor(inst, properties)
        {
            super(inst);
        }

        Release()
        {
            super.Release();
        }

        SaveToJson()
        {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o)
        {
            // load state for savegames
        }
    };
}