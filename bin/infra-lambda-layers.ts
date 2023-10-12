#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaLayerExampleStack } from '../lib/lambda-layer-example-stack';

const app = new cdk.App();
new LambdaLayerExampleStack(app, 'LambdaLayerExampleStack', {})