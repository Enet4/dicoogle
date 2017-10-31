package pt.ua.dicoogle.plugins;

import net.xeoh.plugins.base.annotations.injections.InjectPlugin;
import pt.ua.dicoogle.sdk.DicooglePlugin;
import pt.ua.dicoogle.sdk.PluginSet;
import pt.ua.dicoogle.sdk.core.DicooglePlatformInterface;
import pt.ua.dicoogle.sdk.core.PlatformCommunicatorInterface;

public class PluginPreparer {

    private final DicooglePlatformInterface platform;

    public PluginPreparer(DicooglePlatformInterface platform) {
        this.platform = platform;
    }

    public <P extends DicooglePlugin> void setup(P plugin) {

    }

    public void setup(PluginSet pluginSet) {
        // inject platform with annotations


        // if no annotations, inject with PlatformCommunicatorInterface
        // and to the set itself
        if (pluginSet instanceof PlatformCommunicatorInterface) {
            ((PlatformCommunicatorInterface) pluginSet).setPlatformProxy(this.platform);
        }

    }
}
