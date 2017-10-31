package pt.ua.dicoogle.sdk.annotation;

import net.xeoh.plugins.base.annotations.PluginImplementation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import java.lang.annotation.RetentionPolicy;

/** Type annotation for plugin sets to be injected into Dicoogle.
 * This annotation already inherits {@link PluginImplementation}, which is required for
 * the core system to retrieve the plugin set.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@PluginImplementation
public @interface InjectPluginSet {
    /// The unique name of the plugin set.
    String value();
}
