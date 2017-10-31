package pt.ua.dicoogle.plugins;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.ua.dicoogle.sdk.DicooglePlugin;
import pt.ua.dicoogle.sdk.PluginSet;
import pt.ua.dicoogle.sdk.annotation.InjectPlatformInterface;
import pt.ua.dicoogle.sdk.core.DicooglePlatformInterface;
import pt.ua.dicoogle.sdk.core.PlatformCommunicatorInterface;

import java.lang.reflect.Field;

public class PluginPreparer {
    private static final Logger logger = LoggerFactory.getLogger(PluginPreparer.class);

    private final DicooglePlatformInterface platform;

    public PluginPreparer(DicooglePlatformInterface platform) {
        this.platform = platform;
    }

    public <P extends DicooglePlugin> void setup(P plugin) {
        this.injectPlatform(plugin);
    }

    public void setup(PluginSet pluginSet) {
        this.injectPlatform(pluginSet);
    }

    public void injectPlatform(Object o) {
        // inject platform with annotations
        logger.debug("Looking for annotations");
        boolean injected = false;
        Field[] fields = o.getClass().getDeclaredFields();
        for (Field f: fields) {
            InjectPlatformInterface ann = f.getAnnotation(InjectPlatformInterface.class);
            if (ann != null) {
                try {
                    f.setAccessible(true);
                    f.set(o, this.platform);
                    f.setAccessible(false);
                    injected = true;
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        if (!injected) {
            // inject with PlatformCommunicatorInterface
            if (o instanceof PlatformCommunicatorInterface) {
                ((PlatformCommunicatorInterface) o).setPlatformProxy(this.platform);
            }
        }
    }
}
