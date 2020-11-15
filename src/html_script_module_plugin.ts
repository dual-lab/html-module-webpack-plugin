import {Compiler} from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import minimatch from 'minimatch';

export class HtmlModuleWebpackPlugin {

  private _excludePatterns: string[];

  constructor(options: HtmlWebpackScriptModulePluginOption = DEFAULT_OPTIONS) {
    this._excludePatterns = options.exclude;
  }

  apply(compiler: Compiler): void {
    const identifier = 'html-script-module-plugin';
    const logger = compiler.getInfrastructureLogger(identifier);

    logger.debug('Tap to compilation hook plugin configuration');

    compiler.hooks.compilation.tap(identifier, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        identifier, async (data: any, cb) => {
          data.assetTags.scripts = this._toggleModuleScriptAttribute(data.assetTags.scripts, true);
          return cb(null, data);
        }
      )
    });
  }

  private _toggleModuleScriptAttribute(assets: HtmlWebpackPlugin.HtmlTagObject[], value: boolean) {
    return assets
      .map((script) => {
        if (!value || (script.attributes.src && this._excludePatterns.some((pattern) => minimatch(script.attributes.src as string, pattern)))) {
          return script;
        } else  {
          script.attributes.type = 'module';
          return script;
        }      
      });
  }
}

const DEFAULT_OPTIONS: HtmlWebpackScriptModulePluginOption = {
  exclude: []
}

export interface HtmlWebpackScriptModulePluginOption {
  exclude?: string[];
}
